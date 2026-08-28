(() => {
  const source = window.POST_GLOSSARY || [];
  const rows = [
    ["Workflow","Workflow",["workflow","production workflow"],"An organised sequence of tasks, hand-offs, approvals and deliverables used to move a project from one stage to the next.","The route the project follows so everybody knows what happens next, who does it and what they need."],
    ["DIT","DIT",["digital imaging technician"],"Digital Imaging Technician: the on-set specialist responsible for image workflow, camera data, monitoring and colour-management support.","The person on set who makes sure the recorded image is handled, checked and viewed properly."],
    ["Pipeline","Pipeline",["production pipeline"],"The technical and operational infrastructure that connects applications, departments, assets and approval stages.","The larger system that lets files move between teams without losing information or breaking."],
    ["Asset","Asset",["media asset"],"Any media element or production file managed within a project, including camera originals, audio, graphics, subtitles and masters.","Any file the project needs: footage, sound, graphics, subtitles, exports and more."],
    ["Media management","Media management",["asset management"],"The organised handling of media through naming, storage, verification, transfer, tracking and archiving.","Keeping every file identifiable, findable, protected and in the right place."],
    ["Jornada","Day rate",["daily rate","day"],"The agreed cost of hiring a professional, facility or service for a defined working day.","What one working day costs, including the hours and conditions agreed for it."],
    ["Ingest","Ingest",["media ingest"],"The controlled import of source media into a storage, editorial or post-production system, normally with verification and metadata.","Bringing material into the system in an organised and checked way."],
    ["Offload","Offload",["card offload","copy"],"The verified transfer of recorded media from camera cards or field media to production storage.","Copying a card safely before it is erased and used again."],
    ["Checksum","Checksum",["hash","verification"],"A calculated data signature used to confirm that a copied file is bit-for-bit identical to its source.","A digital fingerprint that proves the copy matches the original."],
    ["Backup 3-2-1","3-2-1 backup",["3-2-1 rule"],"A backup strategy using three copies of data, on two different media types, with one copy kept off-site.","Three copies, two kinds of storage, one somewhere else. One disk is not a backup."],
    ["Metadata","Metadata",["clip metadata"],"Descriptive, technical or administrative information attached to an asset, such as timecode, reel, camera, date or rights data.","Information about a file that helps people identify, search and use it correctly."],
    ["Naming convention","Naming convention",["file naming"],"A documented system for naming files, folders, versions and deliverables consistently.","A shared rule for names so nobody has to guess which file is which."],
    ["Dailies","Dailies",["rushes"],"Processed viewing copies of newly recorded material, often synchronised, colour-managed and supplied with metadata.","Watchable versions of each shooting day's material for review and editing."],
    ["Proxy","Proxy",["proxy media","offline media"],"A lighter derivative of source media created to reduce storage, bandwidth and processing requirements while preserving reliable relinking information.","A smaller, easier copy used for editing that can reconnect to the camera originals later."],
    ["Offline","Offline",["offline edit","reference movie"],"The editorial stage performed with proxy or lower-bandwidth media, or the reference export used to reproduce that edit in later departments.","The approved edit used as a map by colour, sound, VFX and finishing."],
    ["Picture lock","Picture lock",["locked cut","final cut"],"The approved point at which shot order and duration are considered final for downstream post-production.","The moment everyone agrees the edit will stop changing—at least in theory."],
    ["XML","XML",["fcpxml"],"A structured interchange file that transfers editorial decisions and metadata between compatible applications.","A detailed set of instructions that tells another application how the edit was built."],
    ["EDL","EDL",["edit decision list"],"Edit Decision List: a text-based interchange format describing source reels, timecodes and basic edit events.","A simple cut list. Reliable for straightforward edits, limited for complex ones."],
    ["AAF","AAF",["advanced authoring format"],"Advanced Authoring Format: an interchange container for editorial timelines, metadata and optionally embedded or linked media, widely used in audio post.","A package that carries the timeline and useful information from editing into another department, especially sound."],
    ["Relink","Relink",["reconnect media"],"The process of reconnecting timeline events to their corresponding source or higher-quality media.","Telling the timeline where the real files live again."],
    ["Conform","Conform",["online conform"],"The reconstruction and verification of an approved edit using the intended source media, transforms and effects before finishing.","Rebuilding the approved edit with the correct high-quality files and checking that every shot matches."],
    ["Online","Online",["online edit"],"The high-resolution finishing stage in which the conformed timeline, graphics, VFX and final image elements are assembled.","The final image assembly where everything must be present, correct and ready to master."],
    ["Reference Export","Reference export",["reference movie","offline reference"],"A rendered viewing copy of the approved edit, normally carrying timecode, clip names or other burn-ins for comparison.","The video everyone uses to check that the conform still matches the edit."],
    ["Codec","Codec",["encoder","decoder"],"A method used to encode and decode video or audio data, defining how the essence is compressed or represented.","The set of rules used to store the picture or sound inside a file."],
    ["Contenedor","Container",["wrapper","file container"],"A file structure that packages encoded video, audio, subtitles and metadata, such as MOV or MXF.","The box that holds the encoded picture, sound and metadata. It is not the codec itself."],
    ["RAW","RAW",["camera raw"],"Camera data recorded with minimal image processing, retaining sensor information for later interpretation and colour processing.","A flexible camera original that still needs to be interpreted before it looks finished."],
    ["Log","Log",["log gamma","logarithmic encoding"],"A logarithmic encoding designed to store a wide camera dynamic range within a video signal for later grading.","A deliberately flat-looking image that keeps more highlight and shadow information for colour."],
    ["Color Space","Colour space",["color space","gamut"],"A defined model and set of primaries used to represent colour values within an imaging system.","The agreed range and meaning of colours in a project."],
    ["LUT","LUT",["look-up table","lookup table"],"A look-up table that maps input values to output values. A 3D LUT is commonly stored as a 17³, 33³ or 65³ colour cube and may be technical, creative or both.","A conversion table that changes how an image is displayed or transformed. Useful, but not a magic filter."],
    ["Color management","Colour management",["color management","colour pipeline"],"The controlled transformation of image data between camera, working and display colour spaces.","The system that keeps colour predictable as the image moves between cameras, software and screens."],
    ["ACES","ACES",["academy color encoding system"],"The Academy Color Encoding System: a scene-referred colour-management framework for interchange, grading, mastering and archiving.","A common colour framework that helps material from different cameras and outputs live in the same pipeline."],
    ["Rec.709","Rec.709",["bt.709","709"],"An ITU standard defining HDTV image parameters, including colour primaries and transfer characteristics used for SDR delivery.","The familiar SDR colour standard used by most conventional HD video displays."],
    ["P3","P3",["dci-p3","p3-d65"],"A wide-gamut RGB colour space family used for digital cinema and some premium display workflows; DCI-P3 and Display P3 use different white points and transfer functions.","A wider cinema-oriented colour range than Rec.709. The exact P3 flavour still matters."],
    ["Aspect ratio","Aspect ratio",["image ratio"],"The proportional relationship between an image's width and height, such as 1.85:1, 2.39:1 or 16:9.","The shape of the frame."],
    ["Resolución","Resolution",["raster","image dimensions"],"The number of pixels used to represent an image, normally stated as width by height.","How many pixels make up the frame. More pixels do not automatically mean a better image."],
    ["Frame rate","Frame rate",["fps","frames per second"],"The number of image frames captured, played or delivered per second.","How many still images pass each second to create motion."],
    ["Entrelazado","Interlaced",["interlace","interlaced scan"],"A scanning method in which each video frame is split into alternating odd and even fields captured or displayed at different moments.","A legacy video system that builds one frame from two sets of alternating lines."],
    ["Progresivo","Progressive",["progressive scan"],"A scanning method in which every line of each frame is captured and displayed in sequence as a complete image.","Each frame arrives whole, rather than being divided into alternating fields."],
    ["Bit depth","Bit depth",["colour depth","color depth"],"The number of binary bits used to encode each sample or channel, determining the available tonal precision.","How finely the file can describe differences in brightness or colour. More depth means smoother gradations."],
    ["Chroma subsampling","Chroma subsampling",["4:4:4","4:2:2","4:2:0"],"A method of reducing data by storing colour information at lower spatial resolution than luminance, expressed with ratios such as 4:4:4, 4:2:2 or 4:2:0.","A way to save space by keeping less colour detail than brightness detail."],
    ["Bitrate","Bitrate",["data rate"],"The amount of data encoded or transferred per unit of time, usually expressed in megabits per second.","How much data the file spends every second. It affects size and can affect quality."],
    ["Scopes","Scopes",["video scopes","waveform","vectorscope"],"Measurement displays such as waveform, vectorscope, histogram and parade used to evaluate image signal levels and colour objectively.","Technical graphs that show what the image signal is doing, even when the monitor or your eyes mislead you."],
    ["Grading","Colour grading",["color grading","grading"],"The creative and technical adjustment of exposure, contrast, colour and shot consistency to shape the finished image.","Using colour and contrast to make shots belong together and support the story."],
    ["VFX pull","VFX pull",["vfx turnover","pull list"],"The prepared source media, handles, metadata and references delivered for a visual-effects shot or batch.","The correctly selected material sent to VFX so they can work on the right frames."],
    ["EXR","EXR",["openexr"],"OpenEXR: a high-dynamic-range image format supporting floating-point data, multiple channels and extensive metadata, widely used in VFX.","A robust image-sequence format that can carry lots of range, layers and technical information."],
    ["Alpha","Alpha",["alpha channel","matte"],"A channel representing transparency or coverage, commonly used to composite an element over another image.","The transparency map that says which parts of an image are visible."],
    ["Colas","Handles",["heads and tails","extra frames"],"Additional source frames included before and after a used shot to allow trims, transitions and downstream adjustments.","Extra frames around a shot so the next department has room to make changes."],
    ["Burn-in","Burn-in",["burn-in metadata","window burn"],"Text or graphics permanently overlaid on a viewing copy, often showing timecode, clip name, version or security information.","Labels printed onto a reference video so people can identify the exact frame, file and version."],
    ["Finishing","Finishing",["picture finishing","online finishing"],"The final integration and technical preparation of picture elements, including conform, VFX, graphics, colour, versioning and quality control.","The stage where every visual element is assembled, checked and made ready for delivery."],
    ["ADR","ADR",["automated dialogue replacement","additional dialogue recording"],"Additional Dialogue Recording: dialogue re-recorded in post-production to replace or supplement production sound.","Recording dialogue again after the shoot when the original is unusable or the performance needs changing."],
    ["Máster","Master",["master file","final master"],"An approved high-quality source file or package from which distribution copies and versions are derived.","The controlled final source used to create the versions that will actually be delivered."],
    ["Mezzanine","Mezzanine",["intermediate master","mezzanine file"],"A high-quality intermediate file used between production stages when direct use of camera originals or final delivery media is impractical.","A sturdy working copy used to move between stages without carrying the entire original-camera workflow."],
    ["DCP","DCP",["digital cinema package"],"Digital Cinema Package: the standardized set of image, audio, subtitle and metadata files used for digital theatrical exhibition.","The package a cinema server ingests to play the film."],
    ["IMF","IMF",["interoperable master format"],"Interoperable Master Format: a component-based master package designed to manage multiple versions of the same programme efficiently.","A master package that reuses common picture and sound while swapping only what changes between versions."],
    ["QC","QC",["quality control"],"Quality control: systematic technical and content review against agreed specifications before delivery.","The final inspection that looks for faults before the audience, client or platform finds them."],
    ["H.264","H.264",["avc","mpeg-4 avc"],"A widely supported video-compression standard used for screeners, web delivery and consumer playback.","A practical, compact video format for sharing and viewing—not usually the best finishing master."],
    ["ProRes","ProRes",["apple prores"],"A family of Apple intermediate codecs designed for high-quality, frame-accurate post-production and mastering workflows.","A common professional codec that balances image quality, file size and reliable playback."],
    ["Subtítulos","Subtitles",["captions","srt"],"Timed text representing dialogue and other information, delivered as a separate file or rendered into the image depending on requirements.","Text that appears at the right moment. It needs timing, language, formatting and a defined delivery method."],
    ["Stems","Stems",["audio stems","mix stems"],"Separate submixes of dialogue, music, effects and other audio groups supplied for versioning, mastering or localisation.","The final mix split into useful groups so another version can be made without rebuilding everything."],
    ["Versioning","Versioning",["versions","localisation"],"The controlled creation and tracking of alternate programme variants for languages, territories, platforms, runtimes or technical specifications.","Making several correct versions without losing track of what changed in each one."],
    ["Archivo","Archiving",["archive","preservation"],"The planned preservation of source assets, project data, masters, metadata and documentation for future access and recovery.","Keeping the film and the information needed to reopen it after everyone has forgotten where the drives went."],
    ["Nits","Nits",["cd/m2","candela per square metre"],"A common name for candelas per square metre, the unit used to describe display luminance.","A measurement of how bright a screen can be."],
    ["HDR","HDR",["high dynamic range"],"High Dynamic Range imaging and delivery technologies that represent a wider luminance range and often a wider colour gamut than conventional SDR.","A format with more room for bright highlights, deep shadows and colour—provided the whole pipeline supports it."],
    ["SDR","SDR",["standard dynamic range"],"Standard Dynamic Range video using conventional luminance and colour-volume targets, commonly associated with Rec.709 delivery.","The normal video range most traditional televisions, web players and SDR masters expect."],
    ["Dolby Atmos","Dolby Atmos",["atmos","immersive audio"],"An object-based immersive-audio format and rendering system that combines a channel bed with positioned audio objects.","A mix that can place and move sounds around and above the audience, then adapt to the playback system."],
    ["Dolby Vision","Dolby Vision",["dolby vision hdr"],"A proprietary HDR system using dynamic metadata to guide display mapping on a shot-by-shot or scene-by-scene basis.","HDR with instructions that help compatible screens adapt each scene to their own capabilities."],
    ["Artefacto","Artifact",["artefact","compression artifact"],"An unintended visible or audible defect introduced by capture, processing, compression, transmission or display.","A flaw created by the technology rather than something that was actually in the scene."],
    ["Blocking","Blocking",["macroblocking","compression blocking"],"A compression artifact in which areas of the image break into visible square or rectangular blocks, especially in gradients, motion or low light.","Those chunky squares that appear when compression runs out of room to describe the image cleanly."],
    ["Dead pixel","Dead pixel",["stuck pixel"],"A photosite or display pixel that fails to respond correctly and remains inactive or fixed at an incorrect value.","A pixel that no longer behaves and stays dark or stuck."],
    ["Hot pixel","Hot pixel",["bright pixel"],"A sensor pixel producing an abnormally high signal, often appearing as a persistent bright or coloured point, especially in long or high-ISO exposures.","A tiny bright dot that keeps showing up in the same place because one sensor pixel is over-reporting."]
  ];

  const categories = {
    "Workflow": "Workflow",
    "Editorial": "Editorial",
    "Imagen y color": "Image & colour",
    "Finishing": "Finishing",
    "Entrega": "Delivery"
  };

  const bySource = new Map(rows.map((row) => [row[0], row]));
  window.POST_GLOSSARY_EN = source.map((item) => {
    const row = bySource.get(item.term);
    if (!row) return item;
    return {
      term: row[1],
      sourceTerm: row[0],
      category: categories[item.category] || item.category,
      aliases: row[2],
      definition: row[3],
      note: row[4]
    };
  });
})();


