import SseTool from "./SseTool";
import Paper from "paper";
import SseGlobals from "../../../common/SseGlobals";


export default class SseFusionTool extends SseTool {

    constructor(editor) {
        super(editor);
        this.minDistance = 0;
        this.bindCallbacks();
    }

    onKeyDown(event) {
        if (event.key == 'space') {
            this.cancel();
        }
    }

    cancel() {
        this.editor.clearActualSelection();
        this.referencePolygon = null;
    }

    mergePaths(p1, p2) {
        const newPath = p1.unite(p2, {insert: false});
        if (newPath.segments) {
            this.editor.mainLayer.addChild(newPath);
            newPath.addTo(this.editor.mainLayer);
            p1.remove();
            p2.remove();
            newPath.feature = p1.feature;
            p1.feature.path = newPath;
            this.editor.mergingFirstPath = null;
            this.editor.setActualSelection([newPath]);
            this.referencePolygon = newPath;
            newPath.bringToFront();
        } else {
            this.editor.sendMsg("alert", {message: "Merging cancelled: The resulting polygon can not contain hole(s)."})
        }
    }

    onMouseDown(event) {
        if (!this.isLeftButton(event) || event.modifiers.space)
            return super.viewDown(event);


        // A mouse down event could be the beginning of a mouse drag. If it is a mouse drag
        // we don't want to snap to the currently editing feature, so we exclude the selected
        // items
        this.editor.getSelectedPolygons().forEach(path => {
            this.editor.hitExcluded.add(path);
            path.segments.forEach(segment => this.editor.hitExcluded.add(segment))
        });

        if (this.editor.currentSample.objects.length > 0) {
            this.editor.frontLayer.activate();
            //Note which polygon was hit on press
            if( !this.editor.hitInfos || this.editor.hitInfos.type != "polygon" ) {
                this.cancel();
            } else {
                this.referencePolygon = this.editor.hitInfos.polygon;
                this.editor.setActualSelection([this.referencePolygon]);
            }

            this.editor.mainLayer.activate();
            //this.editor.fullUpdate();
        }
    }

    onMouseDrag(event) {
        if (!this.isLeftButton(event) || event.modifiers.space || !this.editor.hitInfos )
            return super.viewDrag(event);

        //Explicitly call hitTesting() to refresh hits as the current editor only calls onMouseMove()
        this.editor.hitTesting(event);

        //Now see if we can merge any polygons that are hit under point with the reference polygon
        //If we aren't under a polygon, then we should cancel current operation since it is invalid to drag into a non-polygon region.
        if( this.referencePolygon && this.editor.hitInfos.type == "polygon" ) {
            //Okay, we done good.  Now let's merge.
            //If the new polygon isn't the reference polygon
            if( this.referencePolygon != this.editor.hitInfos.polygon ) {
                this.mergePaths(this.referencePolygon, this.editor.hitInfos.polygon);
                this.referencePolygon = this.editor.getFirstSelectedPolygon();
            }
        }
        this.editor.drawPointSelection();
    }

    onMouseMove(event) {
        this.editor.zoomPoint = event.point;
        this.editor.unsnap();
        if (this.editor.hitInfos) {
            // Polygon selection through clicking on a polygon or a line
            if (this.editor.hitInfos.type == "polygon" ) {
                this.editor.setPendingSelection([this.editor.hitInfos.polygon]);
                SseGlobals.setCursor("pointer");

                if (this.draggingSegments)
                    this.draggingSegments.forEach(s => this.editor.hitExcluded.delete(s));
                this.draggingSegments = this.snappedSegment = null;
            }
        }
    }

    onMouseUp(event) {
        if (!this.isLeftButton(event) || event.modifiers.space)
            return super.viewUp(event);

        this.referencePolygon = null;
        this.editor.hitExcluded.clear();
        this.editor.updateCommands();
    }
}
