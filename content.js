document.addEventListener('DOMContentLoaded', function() {
  // Code to execute after the page has finished loading
  console.log('page loaded')
});

if (window.location.href.endsWith('.log') || window.location.href.endsWith('.txt') || window.location.href.includes('consoleText')) {
  console.log('found target!')
  const content = document.body.innerHTML;
  const all_error = content.match(/(error|failure|failed|unable)(.*?)(\n|$)/gi);
  const uniqueErrors = Array.from(new Set(all_error));
  const highlightedContent = content.replace(/(error.*?)(\n|$)/gi, '<mark style="font-size: 110%">$1</mark>$2');
  const highlightedContent2 = highlightedContent.replace(/(Exception|RuntimeError|failure|failed|unable)(.*?)(\n|$)/gi, '<mark style="font-size: 110%">$1$2</mark>$3');

  console.log('Length of uniqueErrors:', uniqueErrors.toString().length);

  const errorSummary = '<div style="border: 1px solid black; padding: 10px; margin: 10px; background-color: #f2f2f2; color: #ff0000; font-weight: bold; white-space: pre-line;"><h2>Error Summary</h2>' + uniqueErrors + '</div>';
  document.body.innerHTML = errorSummary + highlightedContent2;

  const loader = document.createElement('div');
  loader.innerHTML = '<i class="fa fa-spinner fa-spin" style="color: blue; font-size: 24px;">AI is analyzing...</i>';
  document.body.appendChild(loader);
  //window.scrollTo(-1,document.body.scrollHeight);

  if (uniqueErrors.length > 0) {
    //let api_url = "https://vllm.libra.decc.vmware.com/api/v1/completions";
    //let api_key = "a3d8a831-3d97-424d-95d9-df34336185a7";
    let api_url = '';
    let api_key = '';
    let max_tokens = 30000;
    chrome.storage.sync.get(['param1', 'param2', 'param3', 'param4'], function(result) {
      api_url = result.param1 || 'https://llm.ai.broadcom.net/api/v1/chat/completions';
      api_key = result.param2 || '552e6208-65e6-4cb1-bc43-f9b603d2ccd4';
      llm_model = result.param3 || 'meta-llama/Meta-Llama-3.1-8B-Instruct';;
      max_tokens = result.param4 || '130000';
      //console.log('api_url:', api_url);
      //console.log('api_key:', api_key);
      const last4000Chars = uniqueErrors.toString().slice(-max_tokens);
      console.log('Length of last4000Chars:', last4000Chars.length);
      fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`
        },
        body: JSON.stringify({
          //"model": "meta-llama/Llama-2-13b-chat-hf",
          "model": llm_model,
          "messages": [
            //{role: 'system', content: 'As a computer expert with expertise in simplifying complex computer system logs, your task is to interpret and analyze errors found in the provided logs and try to give resolution. Please provide a detailed explanation and mark it a "product issue" if there are aspects related to vSphere, NSX or Kubernetes. Response in Chinese.'},
            {role: 'user', content: 'Analyze the errors and try to find the root cause. following are logs: ' + last4000Chars }],
          //"prompt": '<s>[INST] <<SYS>>\nAs a computer expert with expertise in simplifying complex computer system logs, your task is to interpret and analyze errors found in the provided logs. Please provide a detailed explanation and try to give resolution. Mark it a "product issue" if there are aspects related to vSphere, NSX or Kubernetes.\n<</SYS>>\n\nfollowing are logs:' + last4000Chars + ' [/INST] ',
          //"max_tokens": 1024,
          "temperature": 0.3,
        })
      }).then(response => {
        if (response.status === 400) {
          const errorMessage = response.json().detail.message;
          document.body.removeChild(loader);
          document.body.innerHTML += `<i class="fa fa-spinner fa-spin" style="color: blue; font-size: 24px;">AI failed response, 400 (Bad Request), ${errorMessage}</i>`;
          throw new Error('Bad request');
        }
        return response.json();
      })
        .then(data => {
          console.log(data)
          const aiResponse = data.choices[0].message.content;
          const aiResponseHtml = marked.parse(aiResponse);
          document.body.removeChild(loader);
          //const AISummary = '<div style="border: 1px solid black; padding: 10px; margin: 10px; background-color: #f2f2f2; color: #ff0000; font-weight: bold; white-space: pre-line;"><h2>Analysis</h2>' + data.choices[0].text + '</div>';
          //const AISummary = '<div style="border: 1px solid black; padding: 10px; margin: 10px; background-color: #f2f2f2; color: #ff0000;"><h2>Analysis</h2>' + aiResponseHtml + '</div>';
          const AISummary = `
            <div style="border: 1px solid #ccc; padding: 15px; margin: 10px; background-color: #f9f9f9; color: #333333; font-size: 115%;">
                <h2 style="font-size: 24px; color: #555555;">Analysis</h2>
                ${aiResponseHtml}
            </div>
            `;
          document.body.innerHTML += AISummary;
        });
      console.log('last4000Chars: ' + last4000Chars)
    });
  } else {
    // Your updated code here
    document.body.removeChild(loader);
    const AISummary = '<div style="border: 1px solid black; padding: 10px; margin: 10px; background-color: #f2f2f2; color: #ff0000; white-space: pre-line;"><h2>Analysis</h2> No Error </div>';
    document.body.innerHTML += AISummary;
  }

  //window.scrollTo(-1,document.body.scrollHeight);
}

if (window.location.href.includes('bugzilla')) {
  const bugCommentsElement = document.querySelector("#commentContainer > div:nth-child(3)");
  //console.log('bugCommentsElement:', bugCommentsElement);
  if (bugCommentsElement) {
    chrome.storage.sync.get(['param1', 'param2', 'param3', 'param4'], function(result) {
      api_url = result.param1 || 'https://llm.ai.broadcom.net/api/v1/chat/completions';
      api_key = result.param2 || '552e6208-65e6-4cb1-bc43-f9b603d2ccd4';
      llm_model = result.param3 || 'meta-llama/Meta-Llama-3.1-8B-Instruct';;
      max_tokens = result.param4 || '130000';

      const bugCommentsText = bugCommentsElement.textContent.slice(0, max_tokens);
      //console.log('bugCommentsText:', bugCommentsText);

      console.log('bugCommentsText:', api_key, api_url, llm_model, max_tokens); 
      fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`
        },
        body: JSON.stringify({
          "model": llm_model,
          "messages": [{role: 'user', content: 'summarize the bug key info such as what is the problem and how to reproduce it. according to the text: ' + bugCommentsText}],
          "temperature": 0.3,
        })
      }).then(response => {
        return response.json();
      })
      .then(data => {
        if (data.choices && data.choices.length > 0) {
          const aiResponse = data.choices[0].message.content;
          const aiResponseHtml = marked.parse(aiResponse);
          //bugCommentsElement.innerHTML = `<div style="margin-top: 20px; padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc;">${aiResponseHtml.replace(/\n/g, '<br>')}</div>` + bugCommentsElement.innerHTML;
          bugCommentsElement.innerHTML = `<div style="margin-top: 20px; padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc; font-size: 115%;">${aiResponseHtml}</div>` + bugCommentsElement.innerHTML;
        } else {
          console.error('Error: No choices in API response');
          bugCommentsElement.innerHTML = `<div style="margin-top: 20px; padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc; color: red;"><strong>Error:</strong> No AI analysis available.</div>` + bugCommentsElement.innerHTML;
        }
      })
      .catch(error => {
        console.error('Error fetching AI analysis:', error);
        bugCommentsElement.innerHTML = `<div style="margin-top: 20px; padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc; color: red;"><strong>Error:</strong> Failed to fetch AI analysis.</div>` + bugCommentsElement.innerHTML;
      });
    });
  }
}



// Example: Communicate with background script
chrome.runtime.sendMessage({ action: 'contentScriptExecuted' });
