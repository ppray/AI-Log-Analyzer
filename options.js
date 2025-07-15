document.addEventListener('DOMContentLoaded', function() {
    // 获取保存按钮元素
    var saveButton = document.getElementById('saveButton');
  
    // 获取输入框元素
    var param1Input = document.getElementById('param1');
    var param2Input = document.getElementById('param2');
    var param3Input = document.getElementById('param3');
    var param4Input = document.getElementById('param4');
  
    // 添加保存按钮的点击事件
    saveButton.addEventListener('click', function() {
      // 获取用户输入的值
      var param1Value = param1Input.value;
      var param2Value = param2Input.value;
      var param3Value = param3Input.value;
      var param4Value = param4Input.value;
  
      // 保存用户配置
      chrome.storage.sync.set({
        'param1': param1Value,
        'param2': param2Value,
        'param3': param3Value,
        'param4': param4Value
      }, function() {
        // 配置已保存
        console.log('Settings saved');
        // 弹出通知，通知用户设置已保存
        var notification = new Notification('Settings Saved', {
          body: 'Your settings have been saved successfully.'
        });
        document.body.innerHTML += '<div style="border: 1px solid black; padding: 10px; margin: 10px; background-color: #d4edda; color: #155724; font-weight: bold; white-space: pre-line;"><h2>Changes Saved</h2>Your settings have been saved successfully.</div>';
      });
    });
  
    // 在页面加载时，恢复保存的配置
    chrome.storage.sync.get(['param1', 'param2', 'param3', 'param4'], function(result) {
      param1Input.value = result.param1 || 'https://llm.ai.broadcom.net/api/v1/chat/completions';
      param2Input.value = result.param2 || '552e6208-65e6-4cb1-bc43-f9b603d2ccd4';
      param3Input.value = result.param3 || 'meta-llama/Meta-Llama-3.1-8B-Instruct';
      param4Input.value = result.param4 || '130000';
    });
    
  });
  