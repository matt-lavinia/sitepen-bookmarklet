'use strict';

(function(global, $) {
      // Set a minimum word size for our word cloud
      var miniumWordLength = 4;
      var wordsInFile = document.body.innerText.toLowerCase().trim().replace(/[,;.]/g,'').split(/[\s\/]+/g).sort();
      var totalWordCount = wordsInFile.length;
      
      /* 
        Build the CSS Class for the Word, based on Frequency
      */      
      function getCloudCSSClass(frequency){
        if(frequency < 2){
          return "size-1";
        } else if (frequency < 5){
          return "size-2";
        } else if (frequency < 10){
          return "size-3";
        } else if (frequency < 15){
          return "size-4";
        } else {
          return "size-5";
        }
      }

      /* 
        Build the Cheese Tag Cloud
      */
      function buildCloud(wordObject){
        $('.cheese-cloud').append("<span class=\'"+getCloudCSSClass(wordObject.frequency)+"\'>"+wordObject.text+"</span>");
      }

      /* 
        Show the Raw Data Underneath
      */
      function buildWordCounts(wordObject){
        $('.cheese-counts').append('<p>'+wordObject.text+' - ' + wordObject.frequency + '</p>');
      }

      function initCheeseCloud(){
        var frequencyCounts = {}; // object for math
        for (var i = 0; i < totalWordCount; i++) {
          var word = wordsInFile[i];
          if (word.length >= miniumWordLength) {
            frequencyCounts[word] = frequencyCounts[word] || 0;
            frequencyCounts[word]++;
          }
        }
        
        for (word in frequencyCounts) {
          var wordObj = {
            text: word,
            frequency: frequencyCounts[word]
          };

          buildCloud(wordObj);
          buildWordCounts(wordObj);
        }
      }

      $(document).ready(function(){
        initCheeseCloud();
      });

})(window, $);