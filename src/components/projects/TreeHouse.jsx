import React from "react";
import Typography from "@material-ui/core/Typography";
import frame1 from "../../assets/img/treehouse/1_frame.jpg";
import frameAndCantilever2 from "../../assets/img/treehouse/2_frame_and_cantilever.jpg";
import treeHole3 from "../../assets/img/treehouse/3_tree_hole.jpg";
import wallsRoof4 from "../../assets/img/treehouse/4_walls_roof.jpg";
import inside5 from "../../assets/img/treehouse/5_inside.jpg";
import fullNoSiding6 from "../../assets/img/treehouse/6_full_no_siding.jpg";
import full8 from "../../assets/img/treehouse/8_full.jpg";
import fullInterior9 from "../../assets/img/treehouse/9_full_interior.jpg";
import siding10 from "../../assets/img/treehouse/10_siding.jpg";
import "./style.css";

export default function TreeHouse(props) {
  return (
    <div>
      <Typography className="paragraph">
        My brother, cousins, and I built a treehouse! I've always wanted to
        build a treehouse, and this was a perfect ~2 month project for 4 people
        over the pandemic summer.
      </Typography>

      <img src={frame1} alt="Frame in tree" className="image" />
      <Typography className="paragraph">
        The first step (and arguably the most difficult) was to get the floor
        frame up in the tree. We built a clamp that would grip the tree trunk
        tightly, and after getting it level and tightened at around 10' up the
        trunk, we used a tractor and several ladders to gradually hoist the
        frame up and over. We detached two of the joists from the frame while
        lifting so that we could slide the assembly over the clamp.
      </Typography>

      <img
        src={frameAndCantilever2}
        alt="Frame with cantilever beams"
        className="image"
      />
      <Typography className="paragraph">
        To stabilize the frame, we added another clamp several feet below the
        frame and placed four 4x4 cantilever beams at 45&deg; angles to transfer
        load from the frame corners to a central point lower down the tree.
      </Typography>

      <img
        src={treeHole3}
        alt="Cutting tree hole in deck boards"
        className="image"
      />
      <Typography className="paragraph">
        The cedar deck boards needed to be cut so that they would evenly fit
        around the tree trunk. We used a system of string and cardboard to build
        a stencil and transfer the trunk's curvature directly to the cedar
        decking, which we then cut out with a handheld jigsaw.
      </Typography>

      <img src={wallsRoof4} alt="Walls and roof" className="image" />
      <Typography className="paragraph">
        We assembled the stud walls on the ground and then hoisted them up with
        a block-and-tackle pulley system. Using a portable compressed air tank
        and a nail gun, we immediately secured the stud walls into place on the
        frame once they were lifted up. We used four 2x6 beams as rafters to
        support the roof. These were notched so that they would sit on the tops
        of the stud walls and provide more stability.
      </Typography>

      <img src={inside5} alt="Inside, looking up" className="image" />
      <Typography className="paragraph">
        On top of the rafters we secured perlins, which travel perpendicular to
        the rafters and provide a surface to attach the roof. We chose a metal
        roof for longetivity and strength, since debris constantly drops down
        from the tree canopy above. Similar to the decking, we used a stencil to
        transfer the tree's curvature onto the metal roof sheets so that we
        could make more accurate cuts.
      </Typography>

      <img
        src={fullNoSiding6}
        alt="Almost done, still no siding"
        className="image"
      />
      <Typography className="paragraph">
        Picture of treehouse with walls and roof completed.
      </Typography>

      <img src={siding10} alt="Siding installation" className="image" />
      <Typography className="paragraph">
        After assembling the stud walls and roof, we used PVC boards as trim. We
        chose PVC since the trim is on the treehouse exterior and we wanted the
        structure to be as weather-resistant as possible. We covered the lower
        parts of the stud walls with clapboard siding and sealed everything with
        caulking. A 12' scaffold made it much easier to install the siding.
      </Typography>

      <img src={fullInterior9} alt="Interior, with siding" className="image" />
      <Typography className="paragraph">
        View from the doorway of the treehouse. This better illustrates how the
        tree passes through the center of the decking.
      </Typography>

      <img src={full8} alt="Full view, doorway" className="image" />
      <Typography className="paragraph">
        The (mostly) finished product. We still need to add screens / storm
        windows for summer / winter seasons. The clapboard siding has not yet
        been painted (you can see the caulking over the siding nail holes).
      </Typography>
    </div>
  );
}
