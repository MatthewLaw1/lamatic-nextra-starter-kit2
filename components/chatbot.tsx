import { useEffect } from 'react'

declare global {
  interface Window {
    ChatDialog: any;
    CHAT_DIALOG_CONFIG: any;
    loadChatDialog: () => void;
  }
}

const ChatbotScript = () => {
  useEffect(() => {
    // Configure chat dialog
    window.CHAT_DIALOG_CONFIG = {
      botName: process.env.NEXT_PUBLIC_LAMATIC_BOT_NAME || 'Lamatic AI',
      suggestions: process.env.NEXT_PUBLIC_LAMATIC_SUGGESTIONS || ['What is lamatic', 'What is AI', 'What is AI-powered chatbot'],
      policyUrl: 'https://lamatic.ai/docs/legal/privacy-policy',
      apiUrl: process.env.NEXT_PUBLIC_LAMATIC_API_URL,
      workflowId: process.env.NEXT_PUBLIC_LAMATIC_WORKFLOW_ID,
      chatHeaderBgColor: process.env.NEXT_PUBLIC_LAMATIC_CHAT_HEADER_BG_COLOR || 'black',
      imageUrl: process.env.NEXT_PUBLIC_LAMATIC_IMAGE_URL || 'https://owcowialbyyyniqocppr.supabase.co/storage/v1/object/public/icons/Lamatic.svg',
      position: process.env.NEXT_PUBLIC_LAMATIC_POSITION || 'right',
      floatingButtonIcon: process.env.NEXT_PUBLIC_LAMATIC_FLOATING_BUTTON_ICON || 'https://owcowialbyyyniqocppr.supabase.co/storage/v1/object/public/icons/help-circle.svg',
      userId: '',
      errorMessage: process.env.NEXT_PUBLIC_LAMATIC_ERROR_MESSAGE || 'Some error has taken place'
    };

    // Load the scripts sequentially
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initChat = async () => {
      try {
        // Load scripts in sequence
        await loadScript('https://widget.lamatic.ai/chat/emojiPicker.js');
        await loadScript('https://widget.lamatic.ai/chat/index.js');
        
        // Initialize chat after scripts are loaded
        if (window.ChatDialog) {
          new window.ChatDialog(window.CHAT_DIALOG_CONFIG);
        }
      } catch (error) {
        console.error('Error loading chat scripts:', error);
      }
    };

    initChat();

    // Cleanup
    return () => {
      const scripts = [
        'https://widget.lamatic.ai/chat/emojiPicker.js',
        'https://widget.lamatic.ai/chat/index.js'
      ];
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) document.body.removeChild(script);
      });
    };
  }, []);

  return null;
}

export default ChatbotScript; 
