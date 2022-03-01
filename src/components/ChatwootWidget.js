import React from 'react';

class ChatwootWidget extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount () {
    console.log(this.props.user.nickname)
    // Add Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right', // This can be left or right
      locale: 'de', // Language to be set
      type: 'standard', // [standard, expanded_bubble]
      launcherTitle: 'Haben Sie Fragen?'
    };

    // Paste the script from inbox settings except the <script> tag
    (function(d,t) {
      var BASE_URL="https://chat.healform.de";
      var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=BASE_URL+"/packs/js/sdk.js";
      s.parentNode.insertBefore(g,s);
      g.async=!0;
      g.onload=function(){
        window.chatwootSDK.run({
          websiteToken: 'esD6qmc4MUrJ7hJQQEk69CHM',
          baseUrl: BASE_URL
        })
      }
    })(document,"script");
  }

  render () {
    return null;
  }
}

export default ChatwootWidget
