(function () {
  const clusters = [
    ["Workflow", "Pipeline", "Asset", "Media management", "Metadata", "Naming convention", "Jornada", "Archivo"],
    ["DIT", "Ingest", "Offload", "Checksum", "Backup 3-2-1", "Dailies", "Metadata"],
    ["Proxy", "Offline", "Picture lock", "Reference Export", "XML", "EDL", "AAF", "Relink", "Conform", "Online"],
    ["Codec", "Contenedor", "Mezzanine", "ProRes", "H.264", "Bitrate"],
    ["RAW", "Log", "Color Space", "LUT", "Color management", "ACES", "Rec.709", "P3", "Scopes", "Grading"],
    ["Aspect ratio", "Resolución", "Frame rate", "Entrelazado", "Progresivo"],
    ["Bit depth", "Chroma subsampling", "Bitrate", "Artefacto", "Blocking", "Dead pixel", "Hot pixel"],
    ["VFX pull", "EXR", "Alpha", "Colas", "Burn-in", "Finishing", "Online"],
    ["ADR", "Stems", "Dolby Atmos", "Máster", "Versioning"],
    ["Máster", "DCP", "IMF", "QC", "H.264", "ProRes", "Subtítulos", "Stems", "Versioning", "Archivo"],
    ["Nits", "HDR", "SDR", "Dolby Vision", "Color Space", "Rec.709", "P3", "Bit depth"]
  ];

  const crossLinks = [
    ["Workflow", "DIT"], ["Workflow", "Picture lock"], ["Workflow", "Máster"],
    ["Asset", "Ingest"], ["Asset", "Proxy"], ["Asset", "Máster"],
    ["Dailies", "Proxy"], ["Dailies", "LUT"], ["Dailies", "Offline"],
    ["Picture lock", "Conform"], ["Picture lock", "VFX pull"], ["Picture lock", "ADR"],
    ["XML", "Conform"], ["AAF", "ADR"], ["AAF", "Stems"],
    ["Conform", "Grading"], ["Conform", "Finishing"], ["Conform", "Máster"],
    ["Reference Export", "Burn-in"], ["Reference Export", "QC"],
    ["RAW", "Codec"], ["RAW", "Bit depth"], ["Log", "Scopes"],
    ["LUT", "Dailies"], ["LUT", "Grading"], ["Color management", "HDR"],
    ["ACES", "EXR"], ["P3", "DCP"], ["Rec.709", "SDR"],
    ["Aspect ratio", "DCP"], ["Resolución", "DCP"], ["Frame rate", "DCP"],
    ["Bitrate", "H.264"], ["Chroma subsampling", "ProRes"],
    ["Artefacto", "QC"], ["Dead pixel", "QC"], ["Hot pixel", "QC"],
    ["VFX pull", "Picture lock"], ["Colas", "XML"], ["Finishing", "QC"],
    ["HDR", "IMF"], ["Dolby Vision", "IMF"], ["Dolby Atmos", "IMF"],
    ["Subtítulos", "DCP"], ["Subtítulos", "IMF"], ["Versioning", "IMF"]
  ];

  const relations = Object.create(null);

  function connect(left, right) {
    if (!left || !right || left === right) return;
    if (!relations[left]) relations[left] = [];
    if (!relations[right]) relations[right] = [];
    if (!relations[left].includes(right)) relations[left].push(right);
    if (!relations[right].includes(left)) relations[right].push(left);
  }

  clusters.forEach((cluster) => {
    cluster.forEach((term, index) => {
      connect(term, cluster[index - 1]);
      connect(term, cluster[index + 1]);
      connect(term, cluster[index - 2]);
      connect(term, cluster[index + 2]);
    });
  });

  crossLinks.forEach(([left, right]) => connect(left, right));
  window.POST_CONCEPT_RELATIONS = relations;
})();
