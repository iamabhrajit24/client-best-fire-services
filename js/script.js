/**
 * Best Fire Services - Global Script
 * Handles interactions: Preloader, Sticky Nav, Hamburger Menu, Accordion, Scroll Reveal, Back to Top
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 300); // Small delay to guarantee it shows briefly
    });
  }

  // --- Header Sticky & Back to Top ---
  const header = document.querySelector('.header');
  const backToTopBtn = document.querySelector('.fab-up');

  window.addEventListener('scroll', () => {
    // Sticky Header
    if (window.scrollY > 50) {
      if (header) header.classList.add('sticky');
    } else {
      if (header) header.classList.remove('sticky');
    }

    // Back to Top Button
    if (window.scrollY > 500) {
      if (backToTopBtn) backToTopBtn.classList.add('show');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('show');
    }
  });

  // --- Back to Top Click ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Hamburger Menu ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Toggle icon between bars and times (using FontAwesome class convention, assuming FontAwesome is used)
      const icon = hamburger.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // --- Scroll Reveal Animation ---
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // --- FAQ Accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const isActive = question.classList.contains('active');
        
        // Close all other accordions
        faqQuestions.forEach(q => {
          q.classList.remove('active');
          const ans = q.nextElementSibling;
          if (ans) ans.style.maxHeight = null;
        });

        // Toggle current accordion
        if (!isActive) {
          question.classList.add('active');
          const answer = question.nextElementSibling;
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      });
    });
  }

  // --- Active Nav Link Highlight based on current URL ---
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Form Submission Handling ---
  const contactForms = document.querySelectorAll('form');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Enquiry';
      if (submitBtn) {
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
      }

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          const successMsg = document.getElementById('formSuccess');
          if (successMsg) {
            successMsg.style.display = 'block';
            setTimeout(() => {
              successMsg.style.display = 'none';
            }, 7000);
          }
          form.reset();
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              alert(data["errors"].map(error => error["message"]).join(", "));
            } else {
              alert('Oops! There was a problem submitting your form.');
            }
          });
        }
      })
      .catch(error => {
        alert('Oops! There was a problem submitting your form.');
      })
      .finally(() => {
        if (submitBtn) {
           submitBtn.innerHTML = originalBtnText;
           submitBtn.disabled = false;
        }
      });
    });
  });

});

// --- Modal Functions ---
window.openAbcModal = function() {
  const modal = document.getElementById('abcModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
};

window.closeAbcModal = function() {
  const modal = document.getElementById('abcModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

window.openCo2Modal = function() {
  const modal = document.getElementById('co2Modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }
};

window.closeCo2Modal = function() {
  const modal = document.getElementById('co2Modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

window.openFoamModal = function() {
  const modal = document.getElementById('foamModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }
};

window.closeFoamModal = function() {
  const modal = document.getElementById('foamModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

window.openEquipmentModal = function() {
  const modal = document.getElementById('equipmentModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }
};

window.closeEquipmentModal = function() {
  const modal = document.getElementById('equipmentModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
  const abcModal = document.getElementById('abcModal');
  const co2Modal = document.getElementById('co2Modal');
  const foamModal = document.getElementById('foamModal');
  const equipmentModal = document.getElementById('equipmentModal');
  if (e.target === abcModal) {
    closeAbcModal();
  }
  if (e.target === co2Modal) {
    closeCo2Modal();
  }
  if (e.target === foamModal) {
    closeFoamModal();
  }
  if (e.target === equipmentModal) {
    closeEquipmentModal();
  }
});
