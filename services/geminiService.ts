// Servicio para enviar mensajes a través de n8n webhook
// n8n procesará el mensaje con Gemini y devolverá la respuesta

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || '';
  
  if (!n8nWebhookUrl) {
    return "Lo siento, no puedo procesar tu consulta en este momento (Falta configuración del webhook). Por favor contáctanos por el formulario.";
  }

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // n8n puede devolver la respuesta en diferentes formatos
    // Ajusta esto según cómo n8n devuelva la respuesta
    return data.response || data.text || data.message || "No pude generar una respuesta.";
  } catch (error) {
    console.error("n8n Webhook Error:", error);
    return "Hubo un error momentáneo en mi sistema. Por favor, intenta de nuevo o usa el formulario de contacto.";
  }
};