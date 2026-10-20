/* =========================================================
   Kalam Dream World — main.js
   Requires jQuery 3.7 and Bootstrap 5.3 (bundle).
   ========================================================= */
(function () {
  'use strict';

  // If jQuery didn't load, show all content without animation and stop.
  if (typeof window.jQuery === 'undefined') {
    document.documentElement.classList.remove('js');
    return;
  }

  var $ = window.jQuery;

  /* ---------- Contact details (edit here) ---------- */
  var SITE = {
    name: 'Kalam Dream World',
    whatsapp: '919361199536',                 // country code + number, digits only
    email: 'kalamdreamworld777@gmail.com'
  };

  /* ---------- Service details shown in the pop-up ---------- */
  var GROUPS = {
    nonit: 'Non-IT services',
    it: 'IT services',
    work: 'Workforce & training'
  };

  // role = which "I want to" option is pre-selected when someone enquires
  var SERVICES = {
    healthcare: {
      title: 'Healthcare', group: 'nonit', icon: 'bi-heart-pulse', role: 'employer',
      desc: 'We help hospitals, clinics, diagnostic centres and pharma companies build reliable teams, from front-desk and patient-care staff to billing, coding and operations professionals.',
      offers: ['Nursing and patient-care support staff', 'Front office and hospital administration', 'Medical billing and coding professionals', 'Lab and diagnostic support staff', 'Pharma sales and field teams', 'Contract and permanent hiring']
    },
    banking: {
      title: 'Banking', group: 'nonit', icon: 'bi-bank', role: 'employer',
      desc: 'We source and screen people for banks, NBFCs and microfinance institutions, from branch operations to relationship management.',
      offers: ['Branch operations and customer service', 'Relationship and sales managers', 'Loan processing and credit operations', 'KYC, AML and back-office teams', 'Collections and recovery staff', 'Phone banking and support roles']
    },
    finance: {
      title: 'Finance', group: 'nonit', icon: 'bi-graph-up-arrow', role: 'employer',
      desc: 'Skilled finance and accounts professionals who keep your books accurate, your compliance on track and your reporting on time.',
      offers: ['Accountants and bookkeepers', 'Financial and MIS analysts', 'Tax and GST compliance support', 'Audit and internal control assistants', 'Payroll, accounts payable and receivable', 'Finance operations teams']
    },
    insurance: {
      title: 'Insurance', group: 'nonit', icon: 'bi-shield-check', role: 'employer',
      desc: 'Trained advisors, sales teams and operations staff for life, health and general insurance companies.',
      offers: ['Insurance advisors and agency staff', 'Telesales and inside sales teams', 'Underwriting support', 'Claims processing executives', 'Policy servicing and renewals', 'Customer support and retention']
    },
    sap: {
      title: 'SAP', group: 'it', icon: 'bi-boxes', role: 'project',
      desc: 'SAP implementation, integration and support that helps you run finance, supply chain, sales and HR on one connected system.',
      offers: ['SAP S/4HANA implementation', 'Module configuration and customisation', 'Integration with other business systems', 'Upgrades and migrations', 'End-user training', 'Application management and support']
    },
    oracle: {
      title: 'Oracle', group: 'it', icon: 'bi-database-gear', role: 'project',
      desc: 'Implementation, integration and support for Oracle applications and databases, from first setup to day-to-day administration.',
      offers: ['Oracle E-Business Suite and Fusion applications', 'Oracle database administration', 'Performance tuning', 'Upgrades and migrations', 'Integration with other systems', 'Ongoing support']
    },
    temenos: {
      title: 'Temenos banking', group: 'it', icon: 'bi-bank2', role: 'project',
      desc: 'Implementation, customisation and support for Temenos core banking, so banks and financial institutions can run modern, reliable digital banking.',
      offers: ['Temenos core banking implementation', 'Customisation and local requirements', 'Integration with payment and banking systems', 'Upgrades and migrations', 'Testing and quality assurance', 'Production support']
    },
    scm: {
      title: 'Supply chain management', group: 'it', icon: 'bi-truck', role: 'project',
      desc: 'Technology that gives you clear visibility and control from purchasing and stock to warehouses, deliveries and customer orders.',
      offers: ['Purchasing and stock control', 'Warehouse and logistics systems', 'Order processing and delivery tracking', 'Demand planning and forecasting', 'Supplier and partner integration', 'Supply chain dashboards']
    },
    tibco: {
      title: 'TIBCO', group: 'it', icon: 'bi-bezier2', role: 'project',
      desc: 'Connect your applications, data and processes on TIBCO integration and messaging platforms, designed, built and supported by specialists.',
      offers: ['TIBCO BusinessWorks development', 'Messaging with TIBCO EMS', 'API and service integration', 'Upgrades and migrations', 'Monitoring and performance tuning', 'Production support']
    },
    middleware: {
      title: 'Middleware & integration', group: 'it', icon: 'bi-diagram-3', role: 'project',
      desc: 'We connect your applications, databases and platforms so data moves between them automatically and reliably.',
      offers: ['Application and system integration', 'API design and management', 'Enterprise service bus solutions', 'Message queues and event streaming', 'Legacy system integration', 'Integration monitoring and support']
    },
    enterprisedata: {
      title: 'Enterprise data', group: 'it', icon: 'bi-database', role: 'project',
      desc: 'We bring scattered business data into one reliable, well-governed foundation, so every team works from numbers they can trust.',
      offers: ['Data strategy and architecture', 'Data integration and migration', 'Data quality and cleansing', 'Master data management', 'Data warehousing', 'Data governance and security']
    },
    bigdata: {
      title: 'Big data & analytics', group: 'it', icon: 'bi-bar-chart-line', role: 'project',
      desc: 'Turn large volumes of data into dashboards, reports and insights that help you decide faster and with more confidence.',
      offers: ['Big data platforms and pipelines', 'Business intelligence dashboards', 'Reporting and KPI tracking', 'Predictive analytics', 'Real-time data processing', 'Data visualisation']
    },
    cloud: {
      title: 'Cloud', group: 'it', icon: 'bi-cloud-check', role: 'project',
      desc: 'Move to the cloud, or get more from it, with secure and scalable infrastructure that is planned, migrated and managed for you.',
      offers: ['Cloud readiness assessment', 'Migration to public, private or hybrid cloud', 'Cloud infrastructure setup', 'Security and backup', 'Cost optimisation', 'Ongoing cloud support']
    },
    digitalapps: {
      title: 'Digital apps', group: 'it', icon: 'bi-phone', role: 'project',
      desc: 'Modern web and mobile applications that are easy to use, quick to load and built to grow with your business.',
      offers: ['Web applications and portals', 'Android and iOS apps', 'UI and UX design', 'App modernisation', 'API development', 'Maintenance and enhancements']
    },
    testing: {
      title: 'Testing', group: 'it', icon: 'bi-bug', role: 'project',
      desc: 'Independent software testing that catches problems before your customers do, so every release is reliable, secure and fast.',
      offers: ['Functional and regression testing', 'Test automation', 'Performance and load testing', 'Security testing', 'Web and mobile app testing', 'User acceptance testing support']
    },
    managed: {
      title: 'Managed services', group: 'it', icon: 'bi-headset', role: 'project',
      desc: 'We monitor, maintain and improve your IT systems and applications, so your team can stay focused on the business.',
      offers: ['System and application monitoring', 'Incident and problem management', 'Patching and updates', 'Performance tuning', 'Backup and recovery', 'Service desk support']
    },
    workforce: {
      title: 'Workforce solutions', group: 'work', icon: 'bi-people', role: 'employer',
      desc: 'Flexible hiring models that let you grow or adjust your team quickly, with payroll and compliance handled for you.',
      offers: ['Permanent recruitment', 'Contract and temporary staffing', 'Bulk and volume hiring', 'Leadership and specialist search', 'Payroll and compliance management', 'Onboarding support']
    },
    training: {
      title: 'Training & placement', group: 'work', icon: 'bi-mortarboard', role: 'candidate',
      desc: 'Career-focused training that makes freshers and experienced professionals job-ready, followed by help applying and preparing for the right roles.',
      offers: ['Domain training for IT and Non-IT roles', 'Communication and soft skills', 'Resume and LinkedIn profile building', 'Mock interviews and interview preparation', 'Aptitude and assessment practice', 'Placement assistance']
    }
  };

  var ROLE_LABELS = {
    employer: 'Hire talent',
    candidate: 'Find a job',
    project: 'Start an IT project'
  };

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Helpers ---------- */
  function debounce(fn, wait) {
    var t;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function onceInView(el, cb, threshold) {
    if (!el) return;
    if (!hasIO) { cb(el); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          io.disconnect();
          cb(entry.target);
        }
      });
    }, { threshold: threshold || 0.3 });
    io.observe(el);
  }

  $(function () {
    var $win = $(window);
    var $doc = $(document);
    var $nav = $('#siteNav');
    var $toTop = $('.to-top');
    var NAV_OFFSET = 72;

    /* =====================================================
       1. Scrolling helpers
       ===================================================== */
    function scrollToTarget(selector) {
      var $target = $(selector);
      if (!$target.length) return;
      var top = Math.max(0, $target.offset().top - NAV_OFFSET);
      $('html, body').stop(true).animate({ scrollTop: top }, reduceMotion ? 0 : 700);
      if (window.history && history.replaceState) history.replaceState(null, '', selector);
    }

    function closeMenu() {
      var menu = document.getElementById('navMenu');
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
      }
    }

    /* =====================================================
       2. Navbar state, scrollspy, back-to-top
       ===================================================== */
    var $spyLinks = $nav.find('.nav-link[href^="#"]');
    var spy = [];
    $spyLinks.each(function () {
      var id = $(this).attr('href');
      var $section = $(id);
      var exists = spy.some(function (s) { return s.id === id; });
      if ($section.length && !exists) spy.push({ id: id, $el: $section });
    });

    var ticking = false;
    function onScroll() {
      var st = $win.scrollTop();
      $nav.toggleClass('scrolled', st > 24);
      $toTop.toggleClass('show', st > 600);

      var pos = st + NAV_OFFSET + 140;
      var current = null;
      $.each(spy, function (_, s) {
        if (s.$el.offset().top <= pos) current = s.id;
      });
      if (spy.length && st + $win.height() >= $doc.height() - 4) current = spy[spy.length - 1].id;

      $spyLinks.removeClass('active').removeAttr('aria-current');
      if (current) $spyLinks.filter('[href="' + current + '"]').addClass('active').attr('aria-current', 'true');
      ticking = false;
    }
    $win.on('scroll resize', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    });
    onScroll();

    // Solid navbar while the mobile menu is open over the hero
    $('#navMenu')
      .on('show.bs.collapse', function () { $nav.addClass('menu-open'); })
      .on('hidden.bs.collapse', function () { $nav.removeClass('menu-open'); });

    $toTop.on('click', function () {
      $('html, body').stop(true).animate({ scrollTop: 0 }, reduceMotion ? 0 : 700);
    });

    /* =====================================================
       3. In-page links: smooth scroll + pre-fill the form
       ===================================================== */
    $doc.on('click', 'a[href^="#"]', function (e) {
      var $link = $(this);
      var href = $link.attr('href');
      if ($link.is('[data-bs-toggle], .js-service')) return;
      if (href === '#') { e.preventDefault(); return; }   // placeholder links

      var $target;
      try { $target = $(href); } catch (err) { return; }
      if (!$target.length) return;

      e.preventDefault();
      if ($link.data('role')) setRole($link.data('role'));
      if ($link.data('serviceTo')) selectService($link.data('serviceTo'));
      closeMenu();
      scrollToTarget(href);
    });

    // On desktop the "Services" menu opens on hover, so a click goes to the section
    $('.js-services-toggle').on('click', function (e) {
      if (window.innerWidth >= 992) {
        e.preventDefault();
        e.stopPropagation();
        scrollToTarget('#services');
      }
    });

    /* =====================================================
       4. Hero: page-load sequence + starfield
       ===================================================== */
    $('.c-dot').each(function () {
      this.style.setProperty('--tw', (3 + Math.random() * 3).toFixed(2) + 's');
      this.style.animationDelay = (-Math.random() * 4).toFixed(2) + 's';
    });
    setTimeout(function () { $('.hero').addClass('is-ready'); }, 80);

    (function initStars() {
      var canvas = document.getElementById('heroStars');
      if (!canvas || !canvas.getContext) return;
      var ctx = canvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var stars = [], w = 0, h = 0, raf = null, running = true;

      function build() {
        var rect = canvas.parentNode.getBoundingClientRect();
        if (Math.abs(rect.width - w) < 2 && Math.abs(rect.height - h) < 60 && stars.length) return;
        w = rect.width; h = rect.height;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var count = Math.round(Math.min(170, (w * h) / 6500));
        stars = [];
        for (var i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.15 + 0.25,
            a: Math.random() * 0.55 + 0.25,
            s: Math.random() * 0.0012 + 0.0002,
            p: Math.random() * Math.PI * 2,
            warm: Math.random() < 0.06
          });
        }
        draw(0);
      }

      function draw(t) {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i];
          var alpha = reduceMotion ? s.a : s.a * (0.6 + 0.4 * Math.sin(t * s.s + s.p));
          ctx.globalAlpha = alpha;
          ctx.fillStyle = s.warm ? '#F2A93B' : '#FFFFFF';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      function loop(t) {
        if (!running) return;
        draw(t);
        raf = window.requestAnimationFrame(loop);
      }

      build();
      $win.on('resize', debounce(build, 200));

      if (reduceMotion) return;
      if (hasIO) {
        // Only animate while the hero is on screen
        new IntersectionObserver(function (entries) {
          running = entries[0].isIntersecting;
          window.cancelAnimationFrame(raf);
          if (running) raf = window.requestAnimationFrame(loop);
        }).observe(canvas);
      } else {
        raf = window.requestAnimationFrame(loop);
      }
    })();

    /* =====================================================
       5. Scroll reveal (a few key blocks only)
       ===================================================== */
    var $reveals = $('.reveal');
    $reveals.each(function () {
      var d = $(this).data('delay');
      if (d) this.style.setProperty('--d', d + 's');
    });
    if (!hasIO || reduceMotion) {
      $reveals.addClass('revealed');
    } else {
      var revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      $reveals.each(function () { revealIO.observe(this); });
    }

    /* =====================================================
       6. How it works: path toggle + step progress
       ===================================================== */
    var $segBtns = $('.seg-btn');
    var $indicator = $('.seg-indicator');
    var $flows = $('.flow');
    var flowSeen = false;

    function moveIndicator() {
      var $active = $segBtns.filter('[aria-selected="true"]');
      if (!$active.length) return;
      $indicator.css({
        width: $active.outerWidth(),
        transform: 'translateX(' + $active.position().left + 'px)'
      });
    }

    function runFlow($flow) {
      $flow.removeClass('run');
      void $flow[0].offsetWidth;   // restart the transition
      $flow.addClass('run');
    }

    function showFlow(key, moveFocus) {
      $segBtns.each(function () {
        var on = $(this).data('flow') === key;
        $(this).attr({ 'aria-selected': on ? 'true' : 'false', tabindex: on ? 0 : -1 });
        if (on && moveFocus) this.focus();
      });
      $flows.each(function () {
        this.hidden = this.id !== 'flow-' + key;
        $(this).removeClass('run');
      });
      moveIndicator();
      if (flowSeen) runFlow($('#flow-' + key));
    }

    $segBtns.on('click', function () { showFlow($(this).data('flow')); });
    $segBtns.on('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var i = $segBtns.index(this);
      var next = e.key === 'ArrowRight' ? (i + 1) % $segBtns.length : (i - 1 + $segBtns.length) % $segBtns.length;
      showFlow($segBtns.eq(next).data('flow'), true);
    });

    moveIndicator();
    $win.on('resize', debounce(moveIndicator, 100));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);

    onceInView(document.querySelector('.how .flow:not([hidden])'), function () {
      flowSeen = true;
      runFlow($flows.filter(':not([hidden])'));
    }, 0.35);

    /* =====================================================
       7. Service details modal
       ===================================================== */
    var modalEl = document.getElementById('serviceModal');
    var modal = (modalEl && window.bootstrap) ? bootstrap.Modal.getOrCreateInstance(modalEl) : null;
    var lastTrigger = null;
    var pendingEnquiry = null;

    function openService(key, trigger) {
      var s = SERVICES[key];
      if (!s || !modal) return;
      var $m = $(modalEl);
      $m.attr('data-cat', s.group);
      $m.find('.m-ico').html('<i class="bi ' + s.icon + '"></i>');
      $m.find('.m-group').text(GROUPS[s.group]);
      $m.find('.modal-title').text(s.title);
      $m.find('.m-desc').text(s.desc);
      var $list = $m.find('.m-offers').empty();
      $.each(s.offers, function (_, item) { $('<li>').text(item).appendTo($list); });
      $m.find('.m-enquire').attr('data-key', key);
      $m.find('.m-whatsapp').attr('href', 'https://wa.me/' + SITE.whatsapp + '?text=' +
        encodeURIComponent('Hi ' + SITE.name + ", I'm interested in your " + s.title + ' service.'));
      lastTrigger = trigger || null;
      modal.show();
    }

    $doc.on('click', '.svc-row, .c-node, .js-service', function (e) {
      e.preventDefault();
      openService($(this).attr('data-service'), this);
    });
    $doc.on('keydown', '.c-node', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openService($(this).attr('data-service'), this);
      }
    });

    // Name label for the smaller IT stars (shown on hover or keyboard focus)
    var $tip = $('.c-tip');
    var tipText = $tip.find('text').get(0);
    var tipBg = $tip.find('rect').get(0);

    function showTip(node) {
      if (!tipText || !tipBg) return;
      var dot = node.querySelector('.c-dot');
      var cx = parseFloat(dot.getAttribute('cx'));
      var cy = parseFloat(dot.getAttribute('cy'));
      tipText.textContent = node.getAttribute('data-name');
      var w = tipText.getComputedTextLength();
      var padX = 10;
      var x = Math.min(Math.max(cx, w / 2 + padX + 2), 600 - w / 2 - padX - 2);
      var y = cy > 60 ? cy - 24 : cy + 38;   // baseline: above the star, or below near the top edge
      tipText.setAttribute('x', x);
      tipText.setAttribute('y', y);
      tipBg.setAttribute('x', x - w / 2 - padX);
      tipBg.setAttribute('y', y - 18);
      tipBg.setAttribute('width', w + padX * 2);
      tipBg.setAttribute('height', 26);
      $tip.addClass('show');
    }

    $doc.on('mouseenter focus', '.c-sm', function () { showTip(this); });
    $doc.on('mouseleave blur', '.c-sm', function () { $tip.removeClass('show'); });

    $('.m-enquire').on('click', function () {
      pendingEnquiry = $(this).attr('data-key');
      if (modal) modal.hide();
    });

    $(modalEl).on('hidden.bs.modal', function () {
      if (pendingEnquiry) {
        var key = pendingEnquiry;
        pendingEnquiry = null;
        selectService(key);
        setRole(SERVICES[key].role);
        scrollToTarget('#contact');
        setTimeout(function () {
          var field = document.getElementById('cfName');
          if (field) field.focus({ preventScroll: true });
        }, reduceMotion ? 0 : 750);
      } else if (lastTrigger && typeof lastTrigger.focus === 'function') {
        lastTrigger.focus();
      }
    });

    /* =====================================================
       8. Contact form → WhatsApp or email
       ===================================================== */
    function setRole(role) {
      $('#contactForm input[name="role"][value="' + role + '"]').prop('checked', true);
    }

    function selectService(key) {
      var $select = $('#cfService');
      if ($select.find('option[value="' + key + '"]').length) {
        $select.val(key).removeClass('is-invalid');
      }
    }

    var $form = $('#contactForm');
    var $status = $('#formStatus');
    var channel = 'whatsapp';

    $form.find('[data-channel]').on('click', function () {
      channel = $(this).data('channel');
    });

    $form.on('input change', '.is-invalid', function () {
      $(this).removeClass('is-invalid');
    });

    $form.on('submit', function (e) {
      e.preventDefault();

      var $name = $('#cfName');
      var $phone = $('#cfPhone');
      var $email = $('#cfEmail');
      var $service = $('#cfService');

      var name = $.trim($name.val());
      var phone = $.trim($phone.val());
      var digits = phone.replace(/\D/g, '');
      var email = $.trim($email.val());
      var serviceKey = $service.val();
      var message = $.trim($('#cfMessage').val());
      var role = $form.find('input[name="role"]:checked').val();

      $form.find('.is-invalid').removeClass('is-invalid');
      var invalid = [];
      if (name.length < 2) invalid.push($name);
      if (digits.length < 10 || digits.length > 13) invalid.push($phone);
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) invalid.push($email);
      if (!serviceKey) invalid.push($service);

      if (invalid.length) {
        $.each(invalid, function (_, $field) { $field.addClass('is-invalid'); });
        invalid[0].trigger('focus');
        $status.addClass('d-none');
        channel = 'whatsapp';
        return;
      }

      var serviceText = $service.find('option:selected').text();
      var lines = ['Hello ' + SITE.name + ',', '', 'Name: ' + name, 'Phone: ' + phone];
      if (email) lines.push('Email: ' + email);
      lines.push('I want to: ' + (ROLE_LABELS[role] || ''));
      lines.push('Service: ' + serviceText);
      if (message) lines.push('', message);
      var body = lines.join('\n');

      if (channel === 'email') {
        window.location.href = 'mailto:' + SITE.email +
          '?subject=' + encodeURIComponent('Website enquiry: ' + serviceText) +
          '&body=' + encodeURIComponent(body);
        $status.find('span').text('Your email app opened with this message. Press send there to reach us.');
      } else {
        window.open('https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(body), '_blank', 'noopener');
        $status.find('span').text('WhatsApp opened with this message. Press send there to reach us.');
      }
      $status.removeClass('d-none');
      channel = 'whatsapp';
    });

    /* =====================================================
       9. Footer year
       ===================================================== */
    $('#year').text(new Date().getFullYear());
  });
})();
