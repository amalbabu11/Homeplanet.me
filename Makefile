all:
    @echo "nothing implemented for default (all) yet"

add_frontend:
    @echo "adding all frontend files to git"
    git add ./frontend/*

push_to_dev:
    @echo "committing and pushing current git with default message to dev"
    git commit -ma "default commit"
    git push origin dev

branch_main:
    @echo "switch to main branch"
    git checkout main

branch_dev:
    @echo "switch to dev branch"
    git checkout dev
