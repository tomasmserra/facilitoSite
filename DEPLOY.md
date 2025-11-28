# Guía de Deploy - Facilito.ar

## Requisitos Previos

1. Acceso SSH al servidor (ubuntu@162.19.153.120)
2. Docker y Docker Compose instalados en el servidor
3. Traefik configurado y corriendo con la red `traefik-network`
4. Dominio configurado apuntando al servidor

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en el servidor con las variables necesarias:

```bash
GEMINI_API_KEY=tu_api_key_aqui
N8N_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/chatbot
```

**Nota:** Este archivo NO se sube al repositorio por seguridad.

### 2. Configurar Dominio en docker-compose.yml

Edita `docker-compose.yml` y actualiza las labels de Traefik con tu dominio:

```yaml
labels:
  - "traefik.http.routers.facilito-site.rule=Host(`facilito.ar`) || Host(`www.facilito.ar`)"
```

### 3. Ajustar Configuración de Traefik

Si tu configuración de Traefik es diferente, ajusta las labels en `docker-compose.yml`:

- `entrypoints`: Puede ser `web`, `websecure`, etc.
- `certresolver`: Puede ser `letsencrypt`, `cloudflare`, etc.
- `middlewares`: Ajusta según tus middlewares de Traefik

## Deploy

### Opción 1: Deploy con Build Remoto (Recomendado)

Este método construye la imagen directamente en el servidor:

```bash
./deploy-remote.sh
```

**Ventajas:**
- Más rápido (no transfiere la imagen completa)
- Menor uso de ancho de banda
- Construye directamente en el servidor

### Opción 2: Deploy con Build Local

Este método construye la imagen localmente y la transfiere:

```bash
./deploy.sh
```

**Ventajas:**
- Puedes verificar la build localmente antes de subir
- Útil si el servidor tiene recursos limitados

## Verificación

Después del deploy, verifica:

1. **Estado del contenedor:**
   ```bash
   ssh ubuntu@162.19.153.120 "cd /datos/site && docker-compose ps"
   ```

2. **Logs:**
   ```bash
   ssh ubuntu@162.19.153.120 "cd /datos/site && docker-compose logs -f"
   ```

3. **Acceso al sitio:**
   - Visita tu dominio en el navegador
   - Verifica que Traefik esté enrutando correctamente

## Troubleshooting

### El contenedor no inicia

```bash
ssh ubuntu@162.19.153.120 "cd /datos/site && docker-compose logs"
```

### Traefik no enruta el tráfico

1. Verifica que la red `traefik-network` existe:
   ```bash
   ssh ubuntu@162.19.153.120 "docker network ls | grep traefik"
   ```

2. Si no existe, créala:
   ```bash
   ssh ubuntu@162.19.153.120 "docker network create traefik-network"
   ```

3. Verifica las labels en `docker-compose.yml` coinciden con tu configuración de Traefik

### Problemas con variables de entorno

Asegúrate de que `.env.local` existe en el servidor con las variables necesarias.

## Estructura de Archivos en el Servidor

```
/datos/site/
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── .dockerignore
├── .env.local          # (crear manualmente en el servidor)
├── App.tsx
├── components/
├── public/
└── ... (resto del código)
```

## Actualizar el Sitio

Para actualizar el sitio después de hacer cambios:

```bash
./deploy-remote.sh
```

El script automáticamente:
1. Detiene el contenedor anterior
2. Construye la nueva imagen
3. Inicia el nuevo contenedor

## Rollback

Si necesitas volver a una versión anterior:

```bash
ssh ubuntu@162.19.153.120 << EOF
cd /datos/site
docker-compose down
# Restaurar desde backup o git
docker-compose up -d
EOF
```

