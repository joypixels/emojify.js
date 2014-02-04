describe 'emojify on DOM nodes', ->
  beforeEach ->
    @el = document.createElement("DIV")

  describe 'with variations of spacing around 2char smileys', ->
    it 'works with no spacing around :)', ->
      @el.innerHTML = ":)"
      result = emojify.run(@el)
      assert.equal '<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', @el.innerHTML

    it 'works with spacing before :)', ->
      @el.innerHTML = " :)"
      result = emojify.run(@el)
      assert.equal ' <img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', @el.innerHTML

    it 'works with spacing after :)', ->
      @el.innerHTML = ":) "
      result = emojify.run(@el)
      assert.equal '<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img> ', @el.innerHTML

    it 'works with spacing before and after :)', ->
      @el.innerHTML = " :) "
      result = emojify.run(@el)
      assert.equal ' <img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img> ', @el.innerHTML

  describe 'with multiple emoji beside each other', ->
    it 'works with multiple :emoji: style', ->
      @el.innerHTML = ":railway_car::railway_car:"
      emojify.run(@el)
      assert.equal '<img title=":railway_car:" class="emoji" src="images/emoji/railway_car.png" align="absmiddle"></img><img title=":railway_car:" class="emoji" src="images/emoji/railway_car.png" align="absmiddle"></img>', @el.innerHTML

  describe 'isolated cases', ->
    it "it'd", ->
      @el.innerHTML = "it'd"
      emojify.run(@el)
      assert.equal "it'd", @el.innerHTML

    it 'end of string:)', ->
      @el.innerHTML = "end of string:)"
      emojify.run(@el)
      assert.equal "end of string:)", @el.innerHTML

    it 'end of string with space :)', ->
      @el.innerHTML = "end of string with space :)"
      emojify.run(@el)
      assert.equal 'end of string with space <img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', @el.innerHTML

    it ':)start of string without space', ->
      @el.innerHTML = ":)start of string without space"
      emojify.run(@el)
      assert.equal ":)start of string without space", @el.innerHTML

    it ':) start of string with space', ->
      @el.innerHTML = ":) start of string with space"
      emojify.run(@el)
      assert.equal '<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img> start of string with space', @el.innerHTML

    it ':)', ->
      @el.innerHTML = ":)"
      emojify.run(@el)
      assert.equal '<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', @el.innerHTML

    it ':D', ->
      @el.innerHTML = ":D"
      emojify.run(@el)
      assert.equal '<img title=":smiley:" class="emoji" src="images/emoji/smiley.png" align="absmiddle"></img>', @el.innerHTML

    it ':P', ->
      @el.innerHTML = ":P"
      emojify.run(@el)
      assert.equal '<img title=":stuck_out_tongue_winking_eye:" class="emoji" src="images/emoji/stuck_out_tongue_winking_eye.png" align="absmiddle"></img>', @el.innerHTML

    it '>:P', ->
      @el.innerHTML = ">:P"
      emojify.run(@el)
      assert.equal '&gt;<img title=":stuck_out_tongue_winking_eye:" class="emoji" src="images/emoji/stuck_out_tongue_winking_eye.png" align="absmiddle"></img>', @el.innerHTML
