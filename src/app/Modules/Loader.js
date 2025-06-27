define(
  [
    'vendor/httprequest/httprequest',
    'Modules/ThirdPartyScripts',
    'Modules/Detector',
    'Modules/TemplateLoader',
    'Factory/SolarSystemFactory',
    'vendor/ajaxrequest/dist/ajaxrequest'
  ],
  function (
    HttpRequest,
    ThirdPartyScripts,
    Detector,
    TemplateLoader,
    SolarSystemFactory,
    AjaxRequest
  ) {
    'use strict';

    var seenJsFeaturesModal = false;

    if (window.localStorage) {
      seenJsFeaturesModal = localStorage.getItem('seenJsFeaturesModal');
    }

    if (!seenJsFeaturesModal) {
      var browserAlert = new Foundation.Reveal($('#browser-compatibility-modal'));
      browserAlert.open();

      $('#browser-compatibility-got-it').on('click', () => {
        if (window.localStorage) {
          localStorage.setItem('seenJsFeaturesModal', 'true');
        }
      });
    }

    function notifyGa(category, action, label) {
      ga('send', 'event', category, action, label);
      console.log('Event:', category, '-', action, '-', label);
    }

    if (!Detector.webgl) {
      Detector.addGetWebGLMessage();
      notifyGa('Compatibility Check', 'Fail', window.navigator.userAgent);
      return;
    }

    notifyGa('Compatibility Check', 'Pass', window.navigator.userAgent);

    var solarSystemData = null;
    var templateLoader = new TemplateLoader();
    var dataRequest = new HttpRequest(
      'GET',
      'src/data/solarsystem.json',
      true
    );

    dataRequest.send().then((data) => {
      solarSystemData = data;

      const updateUserInterfaceEvent = new CustomEvent('solarsystem.update.ui', {
        detail: data
      });

      const solarSystemFactory = new SolarSystemFactory(solarSystemData);
      const introScreen = $('.intro-screen');
      const renderButton = $('#render-scene');
      const solarsystem = $('#solar-system');
      const progressPrompt = $('#loading-prompt');

      solarsystem.hide();

      // Check for direct load without loader
      const urlParams = new URLSearchParams(window.location.search);
      const directStart = urlParams.get('direct');

      if (directStart === 'true') {
        $('.inner').hide();
        introScreen.hide();
        progressPrompt.hide();

        solarSystemFactory.build(solarSystemData).then(() => {
          solarsystem.show();

          if (!localStorage.getItem('seenModal')) {
            $('#tutorial').foundation('open');
            $('#tutorial-got-it').on('click', () => {
              localStorage.setItem('seenModal', 'true');
            });
          }
        });

        return;
      }

      // Default loader-based launch
      renderButton.one('click', () => {
        $('.inner').slideUp(500, () => {
          progressPrompt.addClass('active');

          solarSystemFactory.build(solarSystemData).then(() => {
            introScreen.fadeOut(2000, () => {
              introScreen.remove();
              solarsystem.fadeIn(2000, () => {
                if (!localStorage.getItem('seenModal')) {
                  $('#tutorial').foundation('open');
                  $('#tutorial-got-it').on('click', () => {
                    localStorage.setItem('seenModal', 'true');
                  });
                }
              });
            });
          });
        });
      });
    });
  }
);
