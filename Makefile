#Alter SETTINGS_FILE to specify the file that contains settings of interest
SETTINGS_FILE?=./settings.json
#Change the mongodb path for the appropriate database backend containing labeled/annotated figures
MONGODB_PATH?=$$(realpath ../data/)
#SSE_IMAGES is the path to the images folder.
SSE_IMAGES?=/media/maule2/MAULE_IMGS_BACKU2/Cranberries/DroneImagery

ifdef DEBUG
	DEBUG=python3 -m pdb 
endif

build.docker:
		docker build --no-cache -t bliptrip/semantic-segmentation-editor:latest -f Dockerfile .

push.docker:
	docker push bliptrip/semantic-segmentation-editor:latest

run.docker:
	docker run --rm -it /bliptrip/semantic-segmentation-editor:latest bin/bash

sse.base:
	METEOR_SETTINGS=$$(cat $(SETTINGS_FILE)) MONGODB_PATH=$(MONGODB_PATH) SSE_IMAGES=$(SSE_IMAGES) docker-compose --file=sse-docker-stack.yml $(COMPOSE_CMD)
	
sse.up: COMPOSE_CMD=up
sse.up: sse.base

sse.start: COMPOSE_CMD=start
sse.start: sse.base

sse.down: COMPOSE_CMD=down
sse.down: sse.base

sse.stop: COMPOSE_CMD=stop
sse.stop: sse.base

sse.echo:
	echo $(METEOR_SETTINGS)

unmatched2matched:
	mongosh -f unmatched2matched.js

sse2masks:
	$(DEBUG) /usr/local/bin/sse2masks.py -f $(SSE_IMAGES) --hostname localhost -p 27017 --db meteor -t matched -s settings.matchplots.json -c "CNJ0x Population Plots" --mask-format flat --mask-image --mask-map matchedplots.map.json
