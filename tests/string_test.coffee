describe 'emojify used with flat strings', ->

  describe 'with variations of spacing around 2char smileys', ->
    it 'works with no spacing around :)', ->
      el = "<div>:)</div>"
      result = emojify.run(el)
      assert.equal '<div><img title=\'&58;blush&58;\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /></div>', result

    it 'works with spacing before :)', ->
      el = "<div> :)</div>"
      result = emojify.run(el)
      assert.equal '<div> <img title=\'&58;blush&58;\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /></div>', result

    it 'works with spacing after :)', ->
      el = "<div>:) </div>"
      result = emojify.run(el)
      assert.equal '<div><img title=\'&58;blush&58;\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /> </div>', result

    it 'works with spacing before and after :)', ->
      el = "<div> :) </div>"
      result = emojify.run(el)
      assert.equal '<div> <img title=\'&58;blush&58;\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /> </div>', result

  describe 'with multiple emoji beside each other', ->
    it 'works with multiple :emoji: style', ->
      el = "<div>:railway_car::railway_car:</div>"
      result = emojify.run(el)
      assert.equal '<div><img title=\'&58;railway_car&58;\' class=\'emoji\' src=\'images/emoji/railway_car.png\' align=\'absmiddle\' /><img title=\'&58;railway_car&58;\' class=\'emoji\' src=\'images/emoji/railway_car.png\' align=\'absmiddle\' /></div>', result

    it 'works with multiple :) style', ->
      el = "<div>:):P</div>"
      result = emojify.run(el)
      assert.equal '<div><img title=\'&58;blush&58;\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /><img title=\'&58;stuck_out_tongue_winking_eye&58;\' class=\'emoji\' src=\'images/emoji/stuck_out_tongue_winking_eye.png\' align=\'absmiddle\' /></div>', result


  describe 'isolated cases', ->
    it ':neckbeard:', ->
      el = "<div>:neckbeard:</div>"
      result = emojify.run(el)
      assert.equal '<div><img title=\'&58;neckbeard&58;\' class=\'emoji\' src=\'images/emoji/neckbeard.png\' align=\'absmiddle\' /></div>', result
