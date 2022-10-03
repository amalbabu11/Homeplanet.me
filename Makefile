all: check
    @echo "running all: calls make check"

########## credit to https://gitlab.com/caitlinlien/cs373-sustainability/-/blob/master/makefile
# check files, check their existence with make check
CFILES :=                                 \
    .gitignore                            \
    .gitlab-ci.yml 

# check the existence of check files
check: $(CFILES)

##########

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
