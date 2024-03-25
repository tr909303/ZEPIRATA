document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.matrix-text');
  const text = header.textContent;
  header.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const span = document.createElement('span');
    span.textContent = char;
    span.style.setProperty('--x', Math.random() * 200 - 100);
    span.style.setProperty('--y', Math.random() * 200 - 100);
    span.style.animation = `particle-animation ${Math.random() * 2 + 3}s linear infinite`;
    header.appendChild(span);
  }
});




document.addEventListener('DOMContentLoaded', function () {
  const videoPlayer = videojs('videoPlayer', {
    html5: {
      hls: {
        overrideNative: true,
		  
      },
    },
  });
	

  videoPlayer.controlBar.show();  // Mostra a barra de controles
	
	

// ... (seu código existente)

// Botão Retroceder 10s
const backwardButton = document.createElement('button');
backwardButton.className = 'custom-button';
backwardButton.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white', 'px-4', 'py-2', 'rounded');
backwardButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
`;
backwardButton.addEventListener('click', function () {
  const currentTime = videoPlayer.currentTime();
  videoPlayer.currentTime(currentTime - 10);
});

// Botão Avançar 10s
const forwardButton = document.createElement('button');
forwardButton.className = 'custom-button';
forwardButton.classList.add('bg-green-500', 'hover:bg-green-600', 'text-white', 'px-4', 'py-2', 'rounded');
forwardButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
`;
forwardButton.addEventListener('click', function () {
  const currentTime = videoPlayer.currentTime();
  videoPlayer.currentTime(currentTime + 10);
});

// Botão PiP
const pipButton = document.createElement('button');
pipButton.className = 'custom-button';
pipButton.classList.add('bg-blue-500', 'hover:bg-blue-600', 'text-white', 'px-4', 'py-2', 'rounded');
pipButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10zM15 4a2 2 0 0 1 2 2h0M15 4v4a2 2 0 0 0 2 2h4M5 11h10"></path>
  </svg>
`;
pipButton.addEventListener('click', function () {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    videoPlayer.requestPictureInPicture();
  }
});

// Botão Gravar
const recordButton = document.createElement('button');
recordButton.className = 'custom-button';
recordButton.classList.add('bg-purple-500', 'hover:bg-purple-600', 'text-white', 'px-4', 'py-2', 'rounded');
recordButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3a2 2 0 012-2h10a2 2 0 012 2v18a2 2 0 01-2 2H7a2 2 0 01-2-2V3zM10 9l5 3-5 3V9z"/>
  </svg>
`;

let mediaRecorder;
let isRecording = false;

// Adicionar evento de clique para o botão de gravação
recordButton.addEventListener('click', toggleRecording);

// Função para alternar a gravação
async function toggleRecording() {
  if (isRecording) {
    await stopRecording();
  } else {
    await startRecording();
  }
}

// Função para iniciar a gravação
async function startRecording() {
  try {
    const stream = videoPlayer.srcObject;
    mediaRecorder = new MediaRecorder(stream);
    
    const chunks = [];

    mediaRecorder.ondataavailable = function (event) {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = function () {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recorded-video.webm';
      a.click();
      URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
    isRecording = true;
    recordButton.classList.add('bg-red-500', 'hover:bg-red-600'); // Altera a cor para indicar que está gravando
  } catch (error) {
    console.error('Erro ao iniciar a gravação:', error);
  }
}

// Função para parar a gravação
async function stopRecording() {
  try {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      isRecording = false;
      recordButton.classList.remove('bg-red-500', 'hover:bg-red-600'); // Volta à cor original
    }
  } catch (error) {
    console.error('Erro ao parar a gravação:', error);
  }
}

// ... (seu código existente)



	
// ... (seu código existente)
// Container para os botões
const buttonsContainer = document.createElement('div');
buttonsContainer.className = 'flex flex-row space-x-4 justify-end absolute bottom-0 right-0 mb-0 mr-4'; // Ajuste de margens e espaçamento
buttonsContainer.appendChild(backwardButton);
buttonsContainer.appendChild(forwardButton);
buttonsContainer.appendChild(pipButton);
buttonsContainer.appendChild(recordButton); // Adiciona o botão de gravação ao container de botões

// Adicionar o container de botões à barra de controles
const controls = document.querySelector('.vjs-control-bar');
controls.appendChild(buttonsContainer);

	
	
  const channelListContainer = document.querySelector('.channel-list');
  const channels = {
  
    "1 - RTP1": "https://streaming-live.rtp.pt/liverepeater/rtp1HD.smil/playlist.m3u8",
    "2 - RTP2 HD": "https://streaming-live.rtp.pt/liverepeater/rtp2HD.smil/playlist.m3u8",
    "3 - SIC": "https://d1zx6l1dn8vaj5.cloudfront.net/out/v1/b89cc37caa6d418eb423cf092a2ef970/index.m3u8",
    "4 - TVI FICCAO": "https://video-auth2.iol.pt/live_tvi_ficcao/live_tvi_ficcao/edge_servers/tvificcao-720p/playlist.m3u8",
    "6 - RTP3": "https://streaming-live.rtp.pt/livetvhlsDVR/rtpnHDdvr.smil/playlist.m3u8",
    "7 - CNN PORTUGAL": "https://video-auth7.iol.pt/live_cnn/live_cnn/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9My8yMy8yMDI0IDEwOjE2OjkgUE0maGFzaF92YWx1ZT1kMnNybUFFemlVTVVuMHh4enRkYkpRPT0mdmFsaWRtaW51dGVzPTE0NDAmaWQ9ODgxZjQ2Y2YtZTI1Mi00NmYxLTljZjYtMGZkN2E3N2E0NmQ2",
	  "RTP MEMORIA": "https://streaming-live.rtp.pt/liverepeater/smil:rtpmem.smil/playlist.m3u8",
	  
	"FOX_NEWS": "https://fox-foxnewsnow-samsungus.amagi.tv/playlist.m3u8",
    "CNN BRASIL": "https://video01.soultv.com.br/cnnbrasil/cnnbrasil/playlist.m3u8?ManoTV",
    "CNN_BRASIL": "https://video01.soultv.com.br/cnnbrasil/cnnbrasil/playlist.m3u8",
    "GLOBO_BAHIA": "https://transcoder.proxy.tokplay.com.br:443/videos/REDEGLOBO/format720p_REDEGLOBO.m3u8",
    "GLOBO_BA_HD": "https://transcoder.proxy.tokplay.com.br:443/videos/REDEGLOBO/format720p_REDEGLOBO.m3u8",
    
	"SPORT - COMBATE GLOBAL": "https://stream.ads.ottera.tv/playlist.m3u8?network_id=960",  
    "SPORT - RED_BULL_TV": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_6660.m3u8",
	"SPORT - DUBAI_RACING_2": "http://dmithrvll.cdn.mangomolo.com/dubairacing/smil:dubairacing.smil/chunklist_b1600000.m3u8",  
	  " 🇵🇹 SPORT TV 1 TESTE": "https://love2live.wideiptv.top/SPT1/index.fmp4.m3u8?token=5541093781a5ceabdbad0f7f2b449ea7fdf9b98d-41509e8ac757cf7ab40b2085e2944224-1711421002-1711410202",
	  " 🇵🇹 SPORT TV 2 TESTE": "https://love2live.wideiptv.top/SPT2/index.fmp4.m3u8?token=d9d6297479c7ce8d5dac590338fc1597fd9cbbc2-314431d4ce17a023e028440c644f4fe9-1711421111-1711410311",
	  " 🇵🇹 SPORT TV 3 TESTE": "https://nes05.jobdone.top:8088/live/game28/playlist.m3u8?vidictid=198079408695&id=120315&pk=8f8b5023b973505a31b45bc75f79569ba5f1a78e85ec33363d05f6006d8dea283b8111c2ddfe34b24a05567876cab0b697b34c7009361608f8303da794727c27",
	  
	"RADIO Antena1": "https://streaming-live.rtp.pt/liveradio/antena180a/playlist.m3u8",
    "RADIO Antena1 FADO": "https://streaming-live.rtp.pt/liveradio/antena1fado80a/playlist.m3u8",
    "RADIO Antena2": "https://streaming-live.rtp.pt/liveradio/antena280a/playlist.m3u8",
    "RADIO Antena2 JAZZ": "https://streaming-live.rtp.pt/liveradio/antena2jazzin80a/playlist.m3u8",
    "RADIO Antena3": "https://streaming-live.rtp.pt/liveradio/antena380a/playlist.m3u8",
     "RADIO CIDADE 2 FM": "https://stream-hls.bauermedia.pt/cidhiphop.aac/playlist.m3u8",
	  
	  
	  
	  
  };
	
  
	

	
	
  function playChannel(channelUrl) {
    videoPlayer.src({
      src: channelUrl,
      type: 'application/x-mpegURL',
    });
    videoPlayer.play();
  }
	
	
	
  function createChannelButtons() {
    const sortedChannels = Object.keys(channels).sort();
    for (const channelName of sortedChannels) {
      const channelUrl = channels[channelName];
      const channelButton = document.createElement('button');
      channelButton.textContent = channelName;
      channelButton.className = 'channel-button';
      channelButton.addEventListener('click', function () {
        playChannel(channelUrl);
      });
      channelListContainer.appendChild(channelButton);
    }
  }
	
	
  function init() {
    createChannelButtons();
    createControlButtons();
  }

  init();
});
















