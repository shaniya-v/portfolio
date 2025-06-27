define([
  'vendor/httprequest/httprequest',
  'Modules/ThirdPartyScripts',
  'Modules/Detector',
  'Modules/TemplateLoader',
  'Factory/SolarSystemFactory',
  'vendor/ajaxrequest/dist/ajaxrequest'
], function(
  HttpRequest,
  ThirdPartyScripts,
  Detector,
  TemplateLoader,
  SolarSystemFactory,
  AjaxRequest
) {
  'use strict';

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
    return;
  }

  const dataRequest = new HttpRequest('GET', 'src/data/solarsystem.json', true);

  dataRequest.send().then((data) => {
    const solarSystemData = data;
    const solarSystemFactory = new SolarSystemFactory(solarSystemData);

    const introScreen = $('.intro-screen');
    const renderButton = $('#render-scene');
    const solarsystem = $('#solar-system');
    const progressPrompt = $('#loading-prompt');

    solarsystem.hide();

    const urlParams = new URLSearchParams(window.location.search);
    const directStart = urlParams.get('direct');

    function launchSolarSystem() {
      $('.inner').hide();
      progressPrompt.addClass('active');

      solarSystemFactory.build(solarSystemData).then(() => {
        introScreen.hide();
        solarsystem.fadeIn(2000, () => {
          const seenModal = localStorage.getItem('seenModal');
          if (!seenModal) {
            $('#tutorial').foundation('open');
            $('#tutorial-got-it').on('click', () => {
              localStorage.setItem('seenModal', 'true');
            });
          }
        });
      });
    }

    if (directStart === 'true') {
      launchSolarSystem(); // ✅ skip intro, show loader
    } else {
      renderButton.one('click', () => {
        $('.inner').slideUp(500, () => {
          launchSolarSystem(); // normal Explore flow
        });
      });
    }
  });
});
