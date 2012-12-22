(function( global ) {
  var emojify = (function() {

    // Get DOM as local variable for simplicity's sake
    var document = global.window.document;

    return {
      // This is some boolean property
      bool: true,
      // Some string value
      string: "a string",
      // An array property
      array: [ 1, 2, 3, 4 ],
      // An object property
      object: {
        lang: "en-Us"
      },
      config: function() {
      },
      findText: function(element, pattern, callback) {
        for (var childi = element.childNodes.length; childi-->0;) {
          var child = element.childNodes[childi];
          if (child.nodeType == 1) {
            var tag = child.tagName.toLowerCase();
            if (tag !== 'script' && tag !== 'style' && tag !== 'textarea')
              this.findText(child, pattern, callback);
            } else if (child.nodeType == 3) {
            var matches = [];
            if (typeof pattern === 'string') {
              console.error("Accepts regex only");
          } else {
            var match;
            while (match = pattern.exec(child.data))
              matches.push(match);
          }
          for (var i = matches.length; i-->0;)
            callback.call(window, child, matches[i]);
          }
        }
      },
      run: function() {

        var emoticons = [
          [/:-*\)/g, "emojify blush"],
          [/:-*o/gi, "emojify scream"],
          [/(:|;)-*]/g, "emojify smirk"],
          [/(:|;)-*d/gi, "emojify smiley"],
          [/xd/gi, "emojify stuck_out_tongue_closed_eyes"],
          [/:-*p/gi, "emojify stuck_out_tongue_winking_eye"],
          [/:-*(\[|@)/g, "emojify rage"],
          [/:-*\(/g, "emojify disappointed"],
          [/:'-*\(/g, "emojify sob"],
          [/:-*\*/g, "emojify kissing_heart"],
          [/;-*\)/g, "emojify wink"],
          [/:-*\//g, "emojify pensive"],
          [/:-*s/gi, "emojify confounded"],
          [/:-*\|/g, "emojify flushed"],
          [/:-*\$/g, "emojify relaxed"],
          [/:-*x/gi, "emojify mask"],
          [/<3/g, "emojify heart"],
          [/<\/3/g, "emojify broken_heart"]
        ], people = [
          [/:bowtie:/g, "emojify bowtie"],
          [/:smile:/g, "emojify smile"],
          [/:laughing:/g, "emojify laughing"],
          [/:blush:/g, "emojify blush"],
          [/:smiley:/g, "emojify smiley"],
          [/:relaxed:/g, "emojify relaxed"],
          [/:smirk:/g, "emojify smirk"],
          [/:heart_eyes:/g, "emojify heart_eyes"],
          [/:kissing_heart:/g, "emojify kissing_heart"],
          [/:kissing_closed_eyes:/g, "emojify kissing_closed_eyes"],
          [/:flushed:/g, "emojify flushed"],
          [/:relieved:/g, "emojify relieved"],
          [/:satisfied:/g, "emojify satisfied"],
          [/:grin:/g, "emojify grin"],
          [/:wink:/g, "emojify wink"],
          [/:wink2:/g, "emojify wink2"],
          [/:stuck_out_tongue_winking_eye:/g, "emojify stuck_out_tongue_winking_eye"],
          [/:stuck_out_tongue_closed_eyes:/g, "emojify stuck_out_tongue_closed_eyes"],
          [/:grinning:/g, "emojify grinning"],
          [/:kissing:/g, "emojify kissing"],
          [/:kissing_smiling_eyes:/g, "emojify kissing_smiling_eyes"],
          [/:stuck_out_tongue:/g, "emojify stuck_out_tongue"],
          [/:sleeping:/g, "emojify sleeping"],
          [/:worried:/g, "emojify worried"],
          [/:frowning:/g, "emojify frowning"],
          [/:anguished:/g, "emojify anguished"],
          [/:open_mouth:/g, "emojify open_mouth"],
          [/:grimacing:/g, "emojify grimacing"],
          [/:confused:/g, "emojify confused"],
          [/:hushed:/g, "emojify hushed"],
          [/:expressionless:/g, "emojify expressionless"],
          [/:unamused:/g, "emojify unamused"],
          [/:sweat_smile:/g, "emojify sweat_smile"],          
          [/:sweat:/g, "emojify sweat"],
          [/:weary:/g, "emojify weary"],
          [/:pensive:/g, "emojify pensive"],
          [/:disappointed:/g, "emojify disappointed"],
          [/:confounded:/g, "emojify confounded"],
          [/:fearful:/g, "emojify fearful"],
          [/:cold_sweat:/g, "emojify cold_sweat"],
          [/:persevere:/g, "emojify persevere"],
          [/:cry:/g, "emojify cry"],
          [/:sob:/g, "emojify sob"],
          [/:joy:/g, "emojify joy"],
          [/:scream:/g, "emojify scream"],
          [/:astonished:/g, "emojify astonished"],
          [/:neckbeard:/g, "emojify neckbeard"],
          [/:tired_face:/g, "emojify tired_face"],
          [/:angry:/g, "emojify angry"],
          [/:rage:/g, "emojify rage"],
          [/:triumph:/g, "emojify triumph"],
          [/:sleepy:/g, "emojify sleepy"],
          [/:yum:/g, "emojify yum"],
          [/:mask:/g, "emojify mask"],
          [/:sunglasses:/g, "emojify sunglasses"],
          [/:dizzy_face:/g, "emojify dizzy_face"],
          [/:imp:/g, "emojify imp"],
          [/:smiling_imp:/g, "emojify smiling_imp"],
          [/:neutral_face:/g, "emojify neutral_face"],
          [/:no_mouth:/g, "emojify no_mouth"],
          [/:innocent:/g, "emojify innocent"],
          [/:alien:/g, "emojify alien"],
          [/:yellow_heart:/g, "emojify yellow_heart"],
          [/:blue_heart:/g, "emojify blue_heart"],
          [/:purple_heart:/g, "emojify purple_heart"],
          [/:heart:/g, "emojify heart"],
          [/:green_heart:/g, "emojify green_heart"],
          [/:broken_heart:/g, "emojify broken_heart"],
          [/:heartbeat:/g, "emojify heartbeat"],
          [/:heartpulse:/g, "emojify heartpulse"],
          [/:two_hearts:/g, "emojify two_hearts"],
          [/:revolving_hearts:/g, "emojify revolving_hearts"],
          [/:cupid:/g, "emojify cupid"],
          [/:sparkling_heart:/g, "emojify sparkling_heart"],
          [/:sparkles:/g, "emojify sparkles"],
          [/:star:/g, "emojify star"],
          [/:star2:/g, "emojify star2"],
          [/:dizzy:/g, "emojify dizzy"],
          [/:boom:/g, "emojify boom"],
          [/:collision:/g, "emojify collision"],
          [/:anger:/g, "emojify anger"],
          [/:exclamation:/g, "emojify exclamation"],
          [/:question:/g, "emojify question"],
          [/:grey_exclamation:/g, "emojify grey_exclamation"],
          [/:grey_question:/g, "emojify grey_question"],
          [/:zzz:/g, "emojify zzz"],
          [/:dash:/g, "emojify dash"],
          [/:sweat_drops:/g, "emojify sweat_drops"],
          [/:notes:/g, "emojify notes"],
          [/:musical_note:/g, "emojify musical_note"],
          [/:fire:/g, "emojify fire"],
          [/:hankey:/g, "emojify hankey"],
          [/:poop:/g, "emojify poop"],
          [/:shit:/g, "emojify shit"],
          [/:thumbsup:|:\+1:/g, "emojify thumbsup"],
          [/:thumbsdown:|:-1:/g, "emojify thumbsdown"],
          [/:ok_hand:/g, "emojify ok_hand"],
          [/:punch:/g, "emojify punch"],
          [/:facepunch:/g, "emojify facepunch"],
          [/:fist:/g, "emojify fist"],
          [/:v:/g, "emojify v"],
          [/:wave:/g, "emojify wave"],
          [/:hand:/g, "emojify hand"],
          [/:open_hands:/g, "emojify open_hands"],
          [/:point_up:/g, "emojify point_up"],
          [/:point_down:/g, "emojify point_down"],
          [/:point_left:/g, "emojify point_left"],
          [/:point_right:/g, "emojify point_right"],
          [/:raised_hands:/g, "emojify raised_hands"],
          [/:pray:/g, "emojify pray"],
          [/:point_up_2:/g, "emojify point_up_2"],
          [/:clap:/g, "emojify clap"],
          [/:muscle:/g, "emojify muscle"],
          [/:metal:/g, "emojify metal"],
          [/:walking:/g, "emojify walking"],
          [/:runner:/g, "emojify runner"],
          [/:running:/g, "emojify running"],
          [/:couple:/g, "emojify couple"],
          [/:family:/g, "emojify family"],
          [/:two_men_holding_hands:/g, "emojify two_men_holding_hands"],
          [/:two_women_holding_hands:/g, "emojify two_women_holding_hands"],
          [/:dancer:/g, "emojify dancer"],
          [/:dancers:/g, "emojify dancers"],
          [/:ok_woman:/g, "emojify ok_woman"],
          [/:no_good:/g, "emojify no_good"],
          [/:information_desk_person:/g, "emojify information_desk_person"],
          [/:raised_hand:/g, "emojify raised_hand"],
          [/:bride_with_veil:/g, "emojify bride_with_veil"],
          [/:person_with_pouting_face:/g, "emojify person_with_pouting_face"],
          [/:person_frowning:/g, "emojify person_frowning"],
          [/:bow:/g, "emojify bow"],
          [/:couplekiss:/g, "emojify couplekiss"],
          [/:couple_with_heart:/g, "emojify couple_with_heart"],
          [/:massage:/g, "emojify massage"],
          [/:haircut:/g, "emojify haircut"],
          [/:nail_care:/g, "emojify nail_care"],
          [/:boy:/g, "emojify boy"],
          [/:girl:/g, "emojify girl"],
          [/:woman:/g, "emojify woman"],
          [/:man:/g, "emojify man"],
          [/:baby:/g, "emojify baby"],
          [/:older_woman:/g, "emojify older_woman"],
          [/:older_man:/g, "emojify older_man"],
          [/:person_with_blond_hair:/g, "emojify person_with_blond_hair"],
          [/:man_with_gua_pi_mao:/g, "emojify man_with_gua_pi_mao"],
          [/:man_with_turban:/g, "emojify man_with_turban"],
          [/:construction_worker:/g, "emojify construction_worker"],
          [/:cop:/g, "emojify cop"],
          [/:angel:/g, "emojify angel"],
          [/:princess:/g, "emojify princess"],
          [/:smiley_cat:/g, "emojify smiley_cat"],
          [/:smile_cat:/g, "emojify smile_cat"],
          [/:heart_eyes_cat:/g, "emojify heart_eyes_cat"],
          [/:kissing_cat:/g, "emojify kissing_cat"],
          [/:smirk_cat:/g, "emojify smirk_cat"],
          [/:scream_cat:/g, "emojify scream_cat"],
          [/:crying_cat_face:/g, "emojify crying_cat_face"],
          [/:joy_cat:/g, "emojify joy_cat"],
          [/:pouting_cat:/g, "emojify pouting_cat"],
          [/:japanese_ogre:/g, "emojify japanese_ogre"],
          [/:japanese_goblin:/g, "emojify japanese_goblin"],
          [/:see_no_evil:/g, "emojify see_no_evil"],
          [/:hear_no_evil:/g, "emojify hear_no_evil"],
          [/:speak_no_evil:/g, "emojify speak_no_evil"],
          [/:guardsman:/g, "emojify guardsman"],
          [/:skull:/g, "emojify skull"],
          [/:feet:/g, "emojify feet"],
          [/:lips:/g, "emojify lips"],
          [/:kiss:/g, "emojify kiss"],
          [/:droplet:/g, "emojify droplet"],
          [/:ear:/g, "emojify ear"],
          [/:eyes:/g, "emojify eyes"],
          [/:nose:/g, "emojify nose"],
          [/:tongue:/g, "emojify tongue"],
          [/:love_letter:/g, "emojify love_letter"],
          [/:bust_in_silhouette:/g, "emojify bust_in_silhouette"],
          [/:busts_in_silhouette:/g, "emojify busts_in_silhouette"],
          [/:speech_balloon:/g, "emojify speech_balloon"],
          [/:thought_balloon:/g, "emojify thought_balloon"],
          [/:feelsgood:/g, "emojify feelsgood"],
          [/:finnadie:/g, "emojify finnadie"],
          [/:goberserk:/g, "emojify goberserk"],
          [/:godmode:/g, "emojify godmode"],
          [/:hurtrealbad:/g, "emojify hurtrealbad"],
          [/:rage1:/g, "emojify rage1"],
          [/:rage2:/g, "emojify rage2"],
          [/:rage3:/g, "emojify rage3"],
          [/:rage4:/g, "emojify rage4"],
          [/:suspect:/g, "emojify suspect"],
          [/:trollface:/g, "emojify trollface"]
        ], nature = [
          [/:sunny:/g, "emojify sunny"],
          [/:umbrella:/g, "emojify umbrella"],
          [/:cloud:/g, "emojify cloud"],
          [/:snowflake:/g, "emojify snowflake"],
          [/:snowman:/g, "emojify snowman"],
          [/:zap:/g, "emojify zap"],
          [/:cyclone:/g, "emojify cyclone"],
          [/:foggy:/g, "emojify foggy"],
          [/:ocean:/g, "emojify ocean"],
          [/:cat:/g, "emojify cat"],
          [/:dog:/g, "emojify dog"],
          [/:mouse:/g, "emojify mouse"],
          [/:hamster:/g, "emojify hamster"],
          [/:rabbit:/g, "emojify rabbit"],
          [/:wolf:/g, "emojify wolf"],
          [/:frog:/g, "emojify frog"],
          [/:tiger:/g, "emojify tiger"],
          [/:koala:/g, "emojify koala"],
          [/:bear:/g, "emojify bear"],
          [/:pig:/g, "emojify pig"],
          [/:pig_nose:/g, "emojify pig_nose"],
          [/:cow:/g, "emojify cow"],
          [/:boar:/g, "emojify boar"],
          [/:monkey_face:/g, "emojify monkey_face"],
          [/:monkey:/g, "emojify monkey"],
          [/:horse:/g, "emojify horse"],
          [/:racehorse:/g, "emojify racehorse"],
          [/:camel:/g, "emojify camel"],
          [/:sheep:/g, "emojify sheep"],
          [/:elephant:/g, "emojify elephant"],
          [/:panda_face:/g, "emojify panda_face"],
          [/:snake:/g, "emojify snake"],
          [/:bird:/g, "emojify bird"],
          [/:baby_chick:/g, "emojify baby_chick"],
          [/:hatched_chick:/g, "emojify hatched_chick"],
          [/:hatching_chick:/g, "emojify hatching_chick"],
          [/:chicken:/g, "emojify chicken"],
          [/:penguin:/g, "emojify penguin"],
          [/:turtle:/g, "emojify turtle"],
          [/:bug:/g, "emojify bug"],
          [/:honeybee:/g, "emojify honeybee"],
          [/:ant:/g, "emojify ant"],
          [/:beetle:/g, "emojify beetle"],
          [/:snail:/g, "emojify snail"],
          [/:octopus:/g, "emojify octopus"],
          [/:tropical_fish:/g, "emojify tropical_fish"],
          [/:fish:/g, "emojify fish"],
          [/:whale:/g, "emojify whale"],
          [/:whale2:/g, "emojify whale2"],
          [/:dolphin:/g, "emojify dolphin"],
          [/:cow2:/g, "emojify cow2"],
          [/:ram:/g, "emojify ram"],
          [/:rat:/g, "emojify rat"],
          [/:water_buffalo:/g, "emojify water_buffalo"],
          [/:tiger2:/g, "emojify tiger2"],
          [/:rabbit2:/g, "emojify rabbit2"],
          [/:dragon:/g, "emojify dragon"],
          [/:goat:/g, "emojify goat"],
          [/:rooster:/g, "emojify rooster"],
          [/:dog2:/g, "emojify dog2"],
          [/:pig2:/g, "emojify pig2"],
          [/:mouse2:/g, "emojify mouse2"],
          [/:ox:/g, "emojify ox"],
          [/:dragon_face:/g, "emojify dragon_face"],
          [/:blowfish:/g, "emojify blowfish"],
          [/:crocodile:/g, "emojify crocodile"],
          [/:dromedary_camel:/g, "emojify dromedary_camel"],
          [/:leopard:/g, "emojify leopard"],
          [/:cat2:/g, "emojify cat2"],
          [/:poodle:/g, "emojify poodle"],
          [/:paw_prints:/g, "emojify paw_prints"],
          [/:bouquet:/g, "emojify bouquet"],
          [/:cherry_blossom:/g, "emojify cherry_blossom"],
          [/:tulip:/g, "emojify tulip"],
          [/:four_leaf_clover:/g, "emojify four_leaf_clover"],
          [/:rose:/g, "emojify rose"],
          [/:sunflower:/g, "emojify sunflower"],
          [/:hibiscus:/g, "emojify hibiscus"],
          [/:maple_leaf:/g, "emojify maple_leaf"],
          [/:leaves:/g, "emojify leaves"],
          [/:fallen_leaf:/g, "emojify fallen_leaf"],
          [/:herb:/g, "emojify herb"],
          [/:mushroom:/g, "emojify mushroom"],
          [/:cactus:/g, "emojify cactus"],
          [/:palm_tree:/g, "emojify palm_tree"],
          [/:evergreen_tree:/g, "emojify evergreen_tree"],
          [/:deciduous_tree:/g, "emojify deciduous_tree"],
          [/:chestnut:/g, "emojify chestnut"],
          [/:seedling:/g, "emojify seedling"],
          [/:blossom:/g, "emojify blossom"],
          [/:ear_of_rice:/g, "emojify ear_of_rice"],
          [/:shell:/g, "emojify shell"],
          [/:globe_with_meridians:/g, "emojify globe_with_meridians"],
          [/:sun_with_face:/g, "emojify sun_with_face"],
          [/:full_moon_with_face:/g, "emojify full_moon_with_face"],
          [/:new_moon_with_face:/g, "emojify new_moon_with_face"],
          [/:new_moon:/g, "emojify new_moon"],
          [/:waxing_crescent_moon:/g, "emojify waxing_crescent_moon"],
          [/:first_quarter_moon:/g, "emojify first_quarter_moon"],
          [/:waxing_gibbous_moon:/g, "emojify waxing_gibbous_moon"],
          [/:full_moon:/g, "emojify full_moon"],
          [/:waning_gibbous_moon:/g, "emojify waning_gibbous_moon"],
          [/:last_quarter_moon:/g, "emojify last_quarter_moon"],
          [/:waning_crescent_moon:/g, "emojify waning_crescent_moon"],
          [/:last_quarter_moon_with_face:/g, "emojify last_quarter_moon_with_face"],
          [/:first_quarter_moon_with_face:/g, "emojify first_quarter_moon_with_face"],
          [/:moon:/g, "emojify moon"],
          [/:earth_africa:/g, "emojify earth_africa"],
          [/:earth_americas:/g, "emojify earth_americas"],
          [/:earth_asia:/g, "emojify earth_asia"],
          [/:volcano:/g, "emojify volcano"],
          [/:milky_way:/g, "emojify milky_way"],
          [/:partly_sunny:/g, "emojify partly_sunny"],
          [/:octocat:/g, "emojify octocat"],
          [/:squirrel:/g, "emojify squirrel"]
        ], r;

        while (r = nature.shift()) {
          this.findText(document.body, r[0], function(node, match) {
            var wrap = document.createElement('div');
            wrap.setAttribute('class', r[1]);
            node.splitText(match.index);
            node.nextSibling.nodeValue = node.nextSibling.nodeValue.substr(match[0].length, node.nextSibling.nodeValue.length);
            wrap.appendChild(node.splitText(match.index));
            node.parentNode.insertBefore(wrap, node.nextSibling);
          });
        }
        while (r = people.shift()) {
          this.findText(document.body, r[0], function(node, match) {
            var wrap = document.createElement('div');
            wrap.setAttribute('class', r[1]);
            node.splitText(match.index);
            node.nextSibling.nodeValue = node.nextSibling.nodeValue.substr(match[0].length, node.nextSibling.nodeValue.length);
            wrap.appendChild(node.splitText(match.index));
            node.parentNode.insertBefore(wrap, node.nextSibling);
          });
        }
        while (r = emoticons.shift()) {
          this.findText(document.body, r[0], function(node, match) {
            var wrap = document.createElement('div');
            wrap.setAttribute('class', r[1]);
            node.splitText(match.index);
            node.nextSibling.nodeValue = node.nextSibling.nodeValue.substr(match[0].length, node.nextSibling.nodeValue.length);
            wrap.appendChild(node.splitText(match.index));
            node.parentNode.insertBefore(wrap, node.nextSibling);
          });
        }
      }
    };
  })();

  global.emojify = emojify;

})( this );