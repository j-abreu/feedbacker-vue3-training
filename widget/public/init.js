function init(apiKey) {
  async function handleLoadWidget(FingerprintJs) {
    const page = `${window.location.origin}${window.location.pathname}`
    const fp = await FingerprintJs.load()
    const fingerprint = await fp.get()

    const WIDGET_URL = `http://jabreu-feedbacker-widget.netlify.app?api_key=${apiKey}&fingerprint=${fingerprint.visitorId}`
    const config = { method: 'HEAD' }
    const response = await fetch(`https://backend-vue3-training-nine.vercel.app/apikey/exists?apikey=${apiKey}`, config)

    if (response.status === 200) {
      const iframe = document.createElement('iframe')
      iframe.src = WIDGET_URL
      iframe.id = 'feedbacker-iframe'
      iframe.style.position = 'fixed'
      iframe.style.bottom = '0px'
      iframe.style.right = '0px'
      iframe.style.overflow = 'hidden'
      iframe.style.border = '0px'
      iframe.style.zIndex = '99999'

      document.body.appendChild(iframe)

      window.addEventListener('message', (event) => {
        if (!event.data.isWidget) return

        if (event.data.isOpen) {
          iframe.width = '100%'
          iframe.height = '100%'
        } else {
          iframe.width = '300px'
          iframe.height = '150px'
        }
      })
      return
    }

    console.log('* [feedbacker] widget was not loaded because api key doesnt exist')

  }

  import('https://openfpcdn.io/fingerprintjs/v3')
    .then(handleLoadWidget)
}