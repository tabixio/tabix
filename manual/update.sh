#!/bin/bash
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [[ `git status --porcelain` ]]; then
  git pull
  /usr/local/bin/mkdocs build
else
  # no changes
fi


