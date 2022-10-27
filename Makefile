all:
	@echo "make all: lists all commands:"
	@echo "\tmake check: makes sure gitlab-ci.yml and .gitignore exist for root directory"
	@echo "\tmake add_frontend: adds all frontend files to git stage, and prints status"
	@echo "\tmake push_to_dev: commits and pushes changes to branch dev"
	@echo "\tmake branch_main: switches branch to main and pulls (be sure all current changes are commited or pushed first)"
	@echo "\tmake branch_dev: switches branch to dev and pulls (be sure all current changes are commited or pushed first)"

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
	git status

push_dev:
	@echo "committing and pushing current git with default message to dev"
	git commit -m "default commit"
	git push origin dev

branch_main:
	@echo "switch to main branch"
	git checkout main
	git pull origin main

branch_dev:
	# note, main won't have this makefile until dev is merged with it.
	@echo "switch to dev branch"
	git checkout dev
	git pull origin dev

# Credit: Univercity.me
selenium-test:
	python3 ./frontend/gui_tests/selenium_runner.py
