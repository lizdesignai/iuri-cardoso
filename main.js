/**
 * ====================================================================
 * DR. IURI CARDOSO | LINKPAGE OFICIAL
 * Script Principal: Preloader, Interações, vCard, QR Code & Google Tag Manager
 * ====================================================================
 */

'use strict';

// Inicialização segura do dataLayer do Google Tag Manager
window.dataLayer = window.dataLayer || [];

function trackEvent(eventName, eventParams = {}) {
  try {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      ...eventParams
    };
    window.dataLayer.push(payload);
    // Log informativo em ambiente de desenvolvimento
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`[GTM dataLayer] ${eventName}:`, payload);
    }
  } catch (err) {
    console.warn('[GTM] Falha ao registrar evento no dataLayer:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------
  // 1. GERENCIAMENTO DO PRE-LOADER ANIMADO EM SVG
  // ------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const startTime = Date.now();
  const MIN_PRELOADER_MS = 1400; // Tempo mínimo para exibição harmoniosa da animação vetorial

  function hidePreloader() {
    if (!preloader) return;
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_PRELOADER_MS - elapsed);

    setTimeout(() => {
      preloader.classList.add('preloader--hidden');
      trackEvent('preloader_completed', { duration_ms: elapsed + remaining });

      // Remove do fluxo do DOM e acessibilidade após transição CSS
      setTimeout(() => {
        preloader.style.display = 'none';
        preloader.setAttribute('aria-hidden', 'true');
      }, 750);
    }, remaining);
  }

  // Aciona o encerramento no load da página com timeout de segurança
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
    // Timeout de segurança caso algum recurso externo demore
    setTimeout(hidePreloader, 3500);
  }

  // ------------------------------------------------------------------
  // 2. ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
  // ------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------
  // 3. SISTEMA DE TOAST NOTIFICATION
  // ------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;

  function showToast(message, duration = 3200) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('toast--visible');
    toast.setAttribute('aria-hidden', 'false');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('toast--visible');
      toast.setAttribute('aria-hidden', 'true');
    }, duration);
  }

  // ------------------------------------------------------------------
  // 4. RASTREAMENTO DE CLIQUES DOS LINKS PRINCIPAIS (GTM)
  // ------------------------------------------------------------------
  const whatsappLink = document.getElementById('link-whatsapp');
  if (whatsappLink) {
    whatsappLink.addEventListener('click', () => {
      trackEvent('whatsapp_click', {
        link_url: whatsappLink.href,
        destination_phone: '+55 71 98284-9694',
        cta_position: 'primary_card'
      });
    });
  }

  const locationLink = document.getElementById('link-location');
  if (locationLink) {
    locationLink.addEventListener('click', () => {
      trackEvent('location_click', {
        link_url: locationLink.href,
        destination_address: 'Salvador - BA',
        cta_position: 'secondary_card'
      });
    });
  }

  const instagramLink = document.querySelector('.instagram-link');
  if (instagramLink) {
    instagramLink.addEventListener('click', () => {
      trackEvent('instagram_click', {
        profile_handle: '@dr.iuricardoso',
        link_url: instagramLink.href
      });
    });
  }

  // ------------------------------------------------------------------
  // 5. COMPARTILHAMENTO NATIVO / COPIAR LINK
  // ------------------------------------------------------------------
  const shareBtn = document.getElementById('btn-share-top');

  async function handleShare() {
    const shareData = {
      title: 'Dr. Iuri Cardoso | Especialista em Otomodelação',
      text: 'Dr. Iuri Cardoso - Especialista em Otomodelação. Para quem cansou de esconder as orelhas.',
      url: window.location.href
    };

    trackEvent('share_initiated', { method: navigator.share ? 'native_api' : 'clipboard' });

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        trackEvent('share_completed', { success: true });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Erro na Web Share API, recorrendo à cópia do link:', err);
        } else {
          return; // Usuário cancelou intencionalmente a tela de compartilhamento
        }
      }
    }

    // Fallback: Copiar para área de transferência
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = window.location.href;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('Link do perfil copiado para a área de transferência!');
      trackEvent('share_completed', { success: true, method: 'clipboard' });
    } catch (clipErr) {
      showToast('Não foi possível copiar o link automaticamente.');
    }
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', handleShare);
  }

  // ------------------------------------------------------------------
  // 6. GERADOR DE VCARD (.VCF) PARA SALVAR NA AGENDA
  // ------------------------------------------------------------------
  const saveVcardBtn = document.getElementById('btn-save-vcard');

  function downloadVCard() {
    trackEvent('vcard_download_click', { contact_name: 'Dr. Iuri Cardoso' });

    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Cardoso;Iuri;;Dr.;',
      'FN:Dr. Iuri Cardoso',
      'ORG:Dr. Iuri Cardoso - Otomodelação;',
      'TITLE:Especialista em Otomodelação | Farmacêutico Esteta',
      'TEL;TYPE=CELL,VOICE,PREF:+5571982849694',
      'URL:https://www.instagram.com/dr.iuricardoso/',
      'NOTE:Especialista em Otomodelação. Para quem cansou de esconder as orelhas. Salvador - BA.',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', 'Dr_Iuri_Cardoso.vcf');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    showToast('Contato pronto para salvar na sua agenda!');
  }

  if (saveVcardBtn) {
    saveVcardBtn.addEventListener('click', downloadVCard);
  }

  // ------------------------------------------------------------------
  // 7. MODAL DE QR CODE
  // ------------------------------------------------------------------
  const showQrBtn = document.getElementById('btn-show-qr');
  const qrModal = document.getElementById('qr-modal');
  const closeQrBtn = document.getElementById('btn-close-qr');
  const qrOverlay = document.getElementById('qr-modal-overlay');
  const qrImage = document.getElementById('qr-image');
  const copyUrlBtn = document.getElementById('btn-copy-url');
  const copyUrlText = document.getElementById('btn-copy-text');

  function openQrModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!qrModal) return;

    if (qrImage) {
      // Garante que o QR Code local pré-gerado seja exibido instantaneamente
      if (!qrImage.getAttribute('src') || qrImage.getAttribute('src') === '') {
        qrImage.src = 'img/qrcode.png';
      }
    }

    qrModal.removeAttribute('hidden');
    qrModal.classList.add('modal--open');
    qrModal.style.display = 'flex';
    trackEvent('qr_modal_opened');
  }

  function closeQrModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!qrModal) return;
    qrModal.classList.remove('modal--open');
    qrModal.setAttribute('hidden', '');
    qrModal.style.display = 'none';
  }

  if (showQrBtn) {
    showQrBtn.addEventListener('click', openQrModal);
  }
  if (closeQrBtn) {
    closeQrBtn.addEventListener('click', closeQrModal);
  }
  if (qrOverlay) {
    qrOverlay.addEventListener('click', closeQrModal);
  }

  // Fechar com a tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && qrModal && !qrModal.hasAttribute('hidden')) {
      closeQrModal();
    }
  });

  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const originalText = copyUrlText.textContent;
        copyUrlText.textContent = 'Link Copiado!';
        showToast('Link do perfil copiado com sucesso!');
        setTimeout(() => {
          copyUrlText.textContent = originalText;
        }, 2200);
      } catch (err) {
        showToast('Link do perfil copiado!');
      }
    });
  }

  // ------------------------------------------------------------------
  // 8. MICRO-INTERAÇÃO DE TILT 3D SUTIL EM DESKTOP
  // ------------------------------------------------------------------
  const cards = document.querySelectorAll('.link-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isTouchDevice && !prefersReducedMotion) {
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});
