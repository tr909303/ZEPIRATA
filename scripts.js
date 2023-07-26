document.addEventListener('DOMContentLoaded', function () {
  const videoPlayer = document.getElementById('videoPlayer');
  const playButton = document.getElementById('playButton');
  const progress = document.querySelector('.progress');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const channels = {
    "RTP1": "https://streaming-live.rtp.pt/liverepeater/smil:rtp1HD.smil/chunklist_b2540000_slpor.m3u8?tk=1690340400_9cff42d47910b45dc6efb3eddf384e6d0ca6fcf9",
    "SIC": "https://d1zx6l1dn8vaj5.cloudfront.net/out/v1/b89cc37caa6d418eb423cf092a2ef970/index.m3u8",
    "SIC NOTICIAS": "https://sicnot.live.impresa.pt/sicnot.m3u8",  
    "SIC NOTICIAS 2": "https://sicnot.live.impresa.pt/sicnot540p.m3u8", 
    "CMTV": "https://nes03.quest123.top:8088/live/agrrrr/playlist.m3u8?vidictid=195648291071&id=116560&pk=a6e25b24751bfff7cc41c151c28d7b153ad121f0bda5f9a065d26a2bfc2b0d0282310c030388bd120813797479ec9e0ad1440879146fb265d64fd2865ade4d76",
    "TVI Channel 4": "https://video-auth6.iol.pt/live_tvi/live_tvi/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9Ny8yNi8yMDIzIDE6MTk6NSBQTSZoYXNoX3ZhbHVlPVZ0empYVnE2Q3ZjbGpRU05zNjc3V1E9PSZ2YWxpZG1pbnV0ZXM9MTQ0MCZpZD0wNDQyNzAzNy05ZWI1LTQ4MjMtOWIwNS03ZDJkYWY3OGEzMDE=",
    "RTP3": "https://streaming-live.rtp.pt/livetvhlsDVR/rtpnHDdvr.smil/chunklist_b2540000_DVR_slpor.m3u8",
    "CNN Portugal": "https://video-auth4.iol.pt/live_cnn/live_cnn/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9Ny8yNi8yMDIzIDk6MTA6MjggUE0maGFzaF92YWx1ZT1rVTRlRk9meFhLNEZSUFZkNGR6UGhRPT0mdmFsaWRtaW51dGVzPTE0NDAmaWQ9M2JlYTE5MTItNWU3Ny00YWQyLTgyNGYtN2IwYjIwOGQ0NTQ2",
    "FUEL TV": "https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/fuel-tv/9fac6918-b3c9-41b8-a15a-f1b000d5ba91/1.m3u8",
    "CLUBBING TV": "https://clubbingtv-samsunguk.amagi.tv/playlist.m3u8", 
	"TRACE URBAN": "https://amg01131-tracetv-traceurban-klowdtv-utiqd.amagi.tv/playlist/amg01131-tracetv-traceurban-klowdtv/cb503e0073717b8b98d43965f2b43dff915f3edd062fd12b6fba4cea24924607c1e3b29be65b963618ca43ce1c5b3e412204db71ce7d01a8df7fc7562d6c6634dac4e71c8ccb6950f6c70a292dad791841e6756db4582f3e99e51303807d927c0618e7402e753a9fb204f86953c485148b612995adcd02682b0b1dc64258e6a740a0f9f34910d96ff7b11f4ac13247b5d410d4d51deed5c9529c12d36bf645cbc6a6ded611d1d4c767a3788847085c31339a8f7787cc53a2e5996138927f2d4a6c3d8cc5badf6c6dcb101920928bcabb76b110c18731846e23840c994183258b6caf7bc38b2ca5a3e18b282c38a0d715722eb4e09f9afa3236cf2591e3e1c9676cc3b95b6f50de23d32e242f94e9dd5a87cc18d9a23184b76c282ac2904bc1e9d8e9faa3b25a8e2cdcc6f7814f242407554fcb10f8f507b328d96be6c21a37593f27c7fb049efeb33031665cc8954deb0309b0cd8a80c67c5da0044a17a52debb76406b95cc1860f4c89fb460eb91248ed0532e94c208743f0ca5d9fc5fed076f73143a538994afaa705c2f378d405dfddc4d2805a694c407c90c0691b3139c740a4f5cbec760509eff6c2bcb03bd7c9fe76206edbb19d15b99cc12e1c5cab394e34234647db54863a8d4321655f429c85d6a9a7a1265861525db9203d2d3682dca492c4c554b030ffc6ee3b203563b2dc59100b61c9bf8155fc771e302a1dc8226540b4094e4df99d92a5b08e7acb9024873961544cf6b02f0158024c325fa4c721977ff28311bcaccf5ee7e6995d10d66bed5246de98f744ccc0ad8b0f0399a152594092d02cca3a6de41fc62485d73f89e100484c72100692ce67fe59b8cd93887ec97be31c550c8512dfb3d0f3ee1431b6c175626636026d3838100b03b7ddd961721ecdac37ea589c8676a1505b3e3a0793c22f6dc6d0357bb8306d6bb1afdb81ce9b5b4933ffdd4de46de70866f3b2049894e033/189/848x480_1249600/index.m3u8",  
    "GLOBO": "https://bozztv.com/dvrfl05/gin-globo/tracks-v1a1/mono.m3u8",
    // Add more channels here
   };

  let hls = null;
  let dash = null;
  let currentChannelUrl = null;

  function playChannel(channelUrl) {
    if (Hls.isSupported()) {
      if (dash) {
        dash.reset();
        dash = null;
      }
      if (hls) {
        hls.destroy();
      }
      hls = new Hls();
      hls.loadSource(channelUrl);
      hls.attachMedia(videoPlayer);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoPlayer.play();
      });
    } else if (dashjs.MediaPlayer().isSupported()) {
      if (hls) {
        hls.destroy();
        hls = null;
      }
      if (dash) {
        dash.reset();
      }
      dash = dashjs.MediaPlayer().create();
      dash.initialize(videoPlayer, channelUrl, true);
      videoPlayer.addEventListener('loadedmetadata', () => {
        videoPlayer.play();
      });
    } else {
      console.error('Neither HLS nor Dash are supported in this browser.');
    }
  }

  function createChannelButtons() {
    const channelListContainer = document.querySelector('.channel-list');
    for (const channelName in channels) {
      const channelUrl = channels[channelName];
      const channelButton = document.createElement('button');
      channelButton.textContent = channelName;
      channelButton.addEventListener('click', function () {
        playChannel(channelUrl);
        currentChannelUrl = channelUrl;
      });
      channelListContainer.appendChild(channelButton);
    }
  }

  function init() {
    createChannelButtons();
    const defaultChannel = Object.values(channels)[0];
    playChannel(defaultChannel);

    playButton.addEventListener('click', () => {
      if (videoPlayer.paused) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
      updatePlayButtonIcon();
    });

    videoPlayer.addEventListener('timeupdate', updateProgressBar);

    fullscreenButton.addEventListener('click', toggleFullScreen);

    diaDeJogoButton.addEventListener('click', () => {
      if (currentChannelUrl) {
        window.open(currentChannelUrl);
      }
    });
  }

  function updatePlayButtonIcon() {
    playButton.classList.toggle('mdi-pause', !videoPlayer.paused);
    playButton.classList.toggle('mdi-play', videoPlayer.paused);
  }

  function updateProgressBar() {
    const progressPercentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progress.style.width = `${progressPercentage}%`;
  }

  function toggleFullScreen() {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) {
      videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
      videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) {
      videoPlayer.msRequestFullscreen();
    }
  }

  init();
});

