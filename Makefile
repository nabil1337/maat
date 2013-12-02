all: test

test:
	@mocha --recursive --reporter=list

.PHONY: test
