#!/bin/bash

#
# This script pulls an up-to-date version of https://github.com/arvida/emoji-cheat-sheet.com.git
# and copies the emoji from that project into this project, also updating the emojify.js script
# with any new emoji
#
# Remember to run grunt afterwards
#

set -e

REPO_DIR=updated/emoji-cheat-sheet.com
REPO_SOURCE=https://github.com/arvida/emoji-cheat-sheet.com.git

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


pushd .

cd $SCRIPT_DIR

if [ -d $REPO_DIR ]; then
  cd  $REPO_DIR
  git reset --hard
  git pull
  cd $SCRIPT_DIR
else
  mkdir -p $REPO_DIR
  git clone $REPO_SOURCE $REPO_DIR
fi

cp $REPO_DIR/public/graphics/emojis/*.png images/emoji

EMOJI="            \"$(ls images/emoji/*.png | cut -d/ -f3 | cut -d\. -f1 | tr \\n ,|sed 's/,$//')\";"

awk -v emoji="$EMOJI" '
    $0 ~ /##EMOJILISTSTART/ {skip=1; print; next}
    $0 ~ /##EMOJILISTEND/ {skip=0; print emoji; }
    !skip {print}
' emojify.js > emoji.js-new

mv emoji.js-new emojify.js

popd
