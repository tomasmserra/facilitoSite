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

echo -e "${YELLOW}🚀 Iniciando deploy de Facilito.ar...${NC}"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}⚠️  Advertencia: No se encontró .env.local${NC}"
    echo -e "${YELLOW}   Asegúrate de tener las variables de entorno configuradas en el servidor${NC}"
fi

# Create .env.production from .env.local if it exists
if [ -f ".env.local" ]; then
    echo -e "${GREEN}📋 Copiando variables de entorno...${NC}"
    cp .env.local .env.production 2>/dev/null || true
fi

# Build the Docker image locally (optional, can also build on server)
echo -e "${GREEN}🔨 Construyendo imagen Docker...${NC}"
docker build -t facilito-site:latest . || {
    echo -e "${RED}❌ Error al construir la imagen Docker${NC}"
    exit 1
}

# Save image to tar
echo -e "${GREEN}💾 Guardando imagen...${NC}"
docker save facilito-site:latest | gzip > facilito-site.tar.gz || {
    echo -e "${RED}❌ Error al guardar la imagen${NC}"
    exit 1
}

# Create remote directory if it doesn't exist
echo -e "${GREEN}📁 Creando directorio remoto...${NC}"
ssh $SERVER "mkdir -p $REMOTE_PATH" || {
    echo -e "${RED}❌ Error al crear directorio remoto${NC}"
    exit 1
}

# Copy files to server
echo -e "${GREEN}📤 Subiendo archivos al servidor...${NC}"
scp -r \
    docker-compose.yml \
    Dockerfile \
    nginx.conf \
    .dockerignore \
    facilito-site.tar.gz \
    $SERVER:$REMOTE_PATH/ || {
    echo -e "${RED}❌ Error al subir archivos${NC}"
    exit 1
}

# Load image and deploy on server
echo -e "${GREEN}🐳 Desplegando en el servidor...${NC}"
ssh $SERVER << EOF
    cd $REMOTE_PATH
    
    # Load Docker image
    echo "Cargando imagen Docker..."
    docker load < facilito-site.tar.gz
    
    # Stop and remove old container if exists
    docker-compose down 2>/dev/null || true
    
    # Start new container
    docker-compose up -d --build
    
    # Clean up
    rm -f facilito-site.tar.gz
    
    # Show status
    echo "Estado del contenedor:"
    docker-compose ps
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deploy completado exitosamente!${NC}"
    echo -e "${GREEN}🌐 Tu sitio debería estar disponible en: https://$DOMAIN${NC}"
else
    echo -e "${RED}❌ Error durante el deploy${NC}"
    exit 1
fi

# Clean up local files
rm -f facilito-site.tar.gz
rm -f .env.production

echo -e "${GREEN}✨ Proceso completado!${NC}"

