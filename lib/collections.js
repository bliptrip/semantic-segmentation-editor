import {Meteor} from 'meteor/meteor';

SseSamples = new Mongo.Collection("SseSamples");
SseProps = new Mongo.Collection("SseProps");

if (Meteor.isServer) {
    Meteor.publish("sse-data-descriptor", function (imageUrl) {
        return SseSamples.find({url: imageUrl});
    });

    Meteor.publish("sse-labeled-images", function () {
        //{$where: 'this.objects && this.objects.length>0'},
        return SseSamples.find(
            {$where: 'this.objects'},
            {fields: {file: 1, url: 1, tags: 1, folder: 1}}
        );
    });

    Meteor.publish('sse-props', function () {
        return SseProps.find({});
    });
}

