#!/bin/bash

# Configuration
SERVER="ubuntu@162.19.153.120"
REMOTE_PATH="/datos/site"
DOMAIN="facilito.ar"  # Cambia esto por tu dominio real

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Iniciando deploy de Facilito.ar (build remoto)...${NC}"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  No se encontró .env.local${NC}"
    echo -e "${YELLOW}   Asegúrate de tener las variables de entorno configuradas en el servidor${NC}"
fi

# Create remote directory if it doesn't exist with correct permissions
echo -e "${GREEN}📁 Preparando directorio remoto...${NC}"
ssh $SERVER "sudo mkdir -p $REMOTE_PATH && sudo chown -R ubuntu:ubuntu $REMOTE_PATH" || {
    echo -e "${RED}❌ Error al crear directorio remoto${NC}"
    exit 1
}

# Build application locally
echo -e "${GREEN}🔨 Construyendo aplicación localmente...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
fi

npm run build || {
    echo -e "${RED}❌ Error al construir la aplicación${NC}"
    exit 1
}

# Copy source files to server (excluding node_modules and dist)
echo -e "${GREEN}📤 Subiendo código fuente al servidor...${NC}"
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude 'dist' \
    --exclude '.git' \
    --exclude '.env.local' \
    --exclude '*.log' \
    --exclude '.DS_Store' \
    ./ $SERVER:$REMOTE_PATH/ || {
    echo -e "${RED}❌ Error al subir archivos${NC}"
    exit 1
}

# Copy docker files separately
scp docker-compose.yml Dockerfile nginx.conf .dockerignore $SERVER:$REMOTE_PATH/ || {
    echo -e "${RED}❌ Error al subir archivos Docker${NC}"
    exit 1
}

# Copy dist directory to server
echo -e "${GREEN}📦 Subiendo archivos construidos (dist)...${NC}"
rsync -avz --progress dist/ $SERVER:$REMOTE_PATH/dist/ || {
    echo -e "${RED}❌ Error al subir directorio dist${NC}"
    exit 1
}

# Deploy on server
echo -e "${GREEN}🐳 Desplegando en el servidor...${NC}"
ssh $SERVER << EOF
    cd $REMOTE_PATH
    
    # Fix permissions for nginx
    sudo chmod -R 755 dist
    sudo chown -R ubuntu:ubuntu dist
    
    # Build Docker image only if it doesn't exist
    if ! sudo docker images | grep -q "site-site"; then
        echo "Construyendo imagen Docker (primera vez)..."
        sudo docker compose build
    fi
    
    # Restart container to pick up new files
    echo "Reiniciando contenedor..."
    sudo docker compose up -d
    
    # Show logs
    echo "Últimas líneas del log:"
    sudo docker compose logs --tail=20
    
    # Show status
    echo ""
    echo "Estado del contenedor:"
    sudo docker compose ps
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deploy completado exitosamente!${NC}"
    echo -e "${GREEN}🌐 Tu sitio debería estar disponible en: https://$DOMAIN${NC}"
else
    echo -e "${RED}❌ Error durante el deploy${NC}"
    exit 1
fi

echo -e "${GREEN}✨ Proceso completado!${NC}"

