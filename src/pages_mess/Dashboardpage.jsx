import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUpload,
  FiEdit,
  FiDownload,
  FiUser,
  FiLogOut,
  FiBell,
  FiSearch,
  FiPlay,
  FiPause,
  FiSave,
  FiTrash2,
  FiCheckCircle,
  FiVideo,
  FiSettings,
  FiMail,
  FiPhone,
  FiGlobe,
  FiClock,
  FiUploadCloud,
  FiFolder,
  FiType,
  FiMusic,
  FiPlusCircle,
  FiFastForward,
  FiSliders,
  FiFileText,
  FiMic,
  FiMicOff,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================
const Dashboard = () => {
  // ==================== STATE MANAGEMENT ====================
  
  // Auth & Layout State
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Upload & Media State
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState(null);

  // 🆕 Audio Library State
  const [audioLibrary, setAudioLibrary] = useState([]);
  const [selectedLibraryAudio, setSelectedLibraryAudio] = useState(null);

  // Editor Core State
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Speed & Motion
  const [videoSpeed, setVideoSpeed] = useState(1);

  // Text Overlay State
  const [textOverlay, setTextOverlay] = useState({
    text: "",
    fontSize: 24,
    color: "#ffffff",
    position: "center",
    opacity: 100,
    visible: true,
  });

  // Visual Effects
  const [filters, setFilters] = useState({
    grayscale: 0,
    sepia: 0,
    brightness: 100,
    contrast: 100,
    blur: 0,
  });

  // Audio & Merge
  const [musicFile, setMusicFile] = useState(null);
  const [extractingAudio, setExtractingAudio] = useState(false);

  // 🆕 Subtitle State
  const [subtitles, setSubtitles] = useState([]);
  const [generatingSubtitles, setGeneratingSubtitles] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [subtitleLang, setSubtitleLang] = useState('en-US');
  const [subtitleStatus, setSubtitleStatus] = useState("");
  const [subtitleMethod, setSubtitleMethod] = useState('screen');
  const recognitionRef = useRef(null);
  const subtitleStartTimeRef = useRef(0);
  const subtitleCollectedRef = useRef([]);
  const subtitleShouldRestartRef = useRef(false);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // 🆕 Mobile Tool Panel State
  const [activeToolTab, setActiveToolTab] = useState('speed');
  const [toolPanelExpanded, setToolPanelExpanded] = useState(true);

  // 🆕 Save / Render State
  const [savingProject, setSavingProject] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);

  // Projects & Data
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Download State
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);

  // Profile Edit
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});

  // ==================== EFFECTS ====================

  // Initialize User Data
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFormData(user);
    }
  }, [user, navigate]);

  // Apply Video Speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed, currentPreviewUrl]);

  // Reload video when source changes
  useEffect(() => {
    if (videoRef.current && currentPreviewUrl) {
      videoRef.current.load();
      setPlaying(false);
      setCurrentTime(0);
    }
  }, [currentPreviewUrl]);

  // Auto Load Projects
  useEffect(() => {
    const saved = localStorage.getItem("magnific_projects");
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) { console.error("Load error", e); }
    }
  }, []);

  // 🆕 Load Audio Library
  useEffect(() => {
    const savedAudio = localStorage.getItem("magnific_audio_library");
    if (savedAudio) {
      try {
        const parsed = JSON.parse(savedAudio);
        const rebuilt = parsed.map(audio => {
          if (audio.base64) {
            try {
              const byteString = atob(audio.base64.split(',')[1]);
              const mimeType = audio.base64.split(',')[0].split(':')[1].split(';')[0];
              const ab = new ArrayBuffer(byteString.length);
              const ia = new Uint8Array(ab);
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              const blob = new Blob([ab], { type: mimeType });
              const freshUrl = URL.createObjectURL(blob);
              return { ...audio, url: freshUrl };
            } catch (err) {
              console.error("Failed to rebuild URL for:", audio.name, err);
              return audio;
            }
          }
          return audio;
        });
        setAudioLibrary(rebuilt);
      } catch (e) { 
        console.error("Audio library load error", e); 
      }
    }
  }, []);

  // 🆕 Save Audio Library
  useEffect(() => {
    if (audioLibrary.length > 0) {
      try {
        const persistable = audioLibrary.map(audio => ({
          id: audio.id,
          name: audio.name,
          base64: audio.base64,
          type: audio.type,
          extractedFrom: audio.extractedFrom,
          date: audio.date,
          sizeInMB: audio.sizeInMB,
        }));
        localStorage.setItem("magnific_audio_library", JSON.stringify(persistable));
      } catch (e) {
        console.error("Audio library save error:", e);
        if (e.name === 'QuotaExceededError') {
          alert("⚠️ Storage full! Delete some audio tracks.");
        }
      }
    } else {
      localStorage.removeItem("magnific_audio_library");
    }
  }, [audioLibrary]);

  // Filter Search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  // 🆕 Update current subtitle
  useEffect(() => {
    if (!subtitles.length || !showSubtitles) {
      setCurrentSubtitle("");
      return;
    }
    const active = subtitles.find(s => currentTime >= s.start && currentTime <= s.end);
    setCurrentSubtitle(active ? active.text : "");
  }, [currentTime, subtitles, showSubtitles]);

  // 🆕 Apply library audio
  useEffect(() => {
    if (selectedLibraryAudio && audioRef.current) {
      setMusicFile(selectedLibraryAudio.url);
      audioRef.current.src = selectedLibraryAudio.url;
    }
  }, [selectedLibraryAudio]);

  // ==================== HANDLERS ====================

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleMedia(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleMedia(e.target.files[0]);
    }
  };

  const handleMedia = (file) => {
    if (file.type.startsWith("video/") || file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      
      if (file.type.startsWith("audio/")) {
        setMusicFile(url);
        if(audioRef.current) audioRef.current.src = url;
        const audioEntry = { id: Date.now(), name: file.name, url: url, type: 'audio' };
        setUploadedFiles(prev => [...prev, audioEntry]);
      } else {
        const newEntry = { id: Date.now(), name: file.name, url: url, type: 'video' };
        
        if (uploadedFiles.filter(f => f.type === 'video').length === 0) {
          setUploadedFiles(prev => [...prev, newEntry]);
          setCurrentPreviewUrl(url);
          setTimeout(() => setActiveTab('editor'), 500);
        } else {
          setUploadedFiles(prev => [...prev, newEntry]);
        }
      }
    } else {
      alert("Invalid file type. Please upload video or audio.");
    }
  };

  const togglePlay = async () => {
    if (!videoRef.current || !currentPreviewUrl) return;
    
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        if (audioRef.current && musicFile) {
          audioRef.current.play().catch(() => {});
        }
      } else {
        videoRef.current.pause();
        if (audioRef.current) audioRef.current.pause();
      }
    } catch (err) {
      console.error("Play error:", err);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  const applyPreset = (type) => {
    const presets = {
      vintage: { sepia: 80, brightness: 110, contrast: 90, grayscale: 0, blur: 0 },
      bw: { grayscale: 100, sepia: 0, brightness: 100, contrast: 100, blur: 0 },
      vivid: { sepia: 0, brightness: 120, contrast: 130, grayscale: 0, blur: 0 },
      restore: { sepia: 0, brightness: 100, contrast: 100, grayscale: 0, blur: 0 },
    };
    setFilters(prev => ({ ...prev, ...presets[type] }));
  };

  const updateText = (field, value) => {
    setTextOverlay(prev => ({ ...prev, [field]: value }));
  };

  // Audio Extraction
  const extractSound = async () => {
    if (!currentPreviewUrl || !videoRef.current) {
      alert("Please load a video first to extract audio.");
      return;
    }

    setExtractingAudio(true);

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const response = await fetch(currentPreviewUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start();
      
      const renderedBuffer = await offlineContext.startRendering();
      const wavBlob = audioBufferToWav(renderedBuffer);
      const audioUrl = URL.createObjectURL(wavBlob);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result;
        const sizeInMB = (base64Audio.length * 0.75) / (1024 * 1024);
        
        if (sizeInMB > 8) {
          const proceed = window.confirm(
            `⚠️ This audio is ${sizeInMB.toFixed(1)} MB. Continue?`
          );
          if (!proceed) {
            setExtractingAudio(false);
            return;
          }
        }
        
        const extractedAudio = {
          id: Date.now(),
          name: `Extracted-${uploadedFiles[0]?.name || 'audio'}.wav`,
          url: audioUrl,
          base64: base64Audio,
          type: 'extracted',
          extractedFrom: uploadedFiles[0]?.name || 'Unknown',
          date: new Date().toISOString(),
          sizeInMB: sizeInMB.toFixed(2),
        };
        
        setAudioLibrary(prev => [...prev, extractedAudio]);
        setExtractingAudio(false);
        alert(`✅ Audio extracted! Size: ${sizeInMB.toFixed(2)} MB`);
      };
      
      reader.readAsDataURL(wavBlob);
      
    } catch (err) {
      console.error("Audio extraction error:", err);
      setExtractingAudio(false);
      alert("Failed to extract audio: " + err.message);
    }
  };

  const audioBufferToWav = (buffer) => {
    const length = buffer.length * buffer.numberOfChannels * 2 + 44;
    const arrayBuffer = new ArrayBuffer(length);
    const view = new DataView(arrayBuffer);
    const channels = [];
    let offset = 0;
    let pos = 0;

    const setUint16 = (data) => {
      view.setUint16(pos, data, true);
      pos += 2;
    };
    const setUint32 = (data) => {
      view.setUint32(pos, data, true);
      pos += 4;
    };

    setUint32(0x46464952);
    setUint32(length - 8);
    setUint32(0x45564157);
    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(buffer.numberOfChannels);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * buffer.numberOfChannels * 2);
    setUint16(buffer.numberOfChannels * 2);
    setUint16(16);
    setUint32(0x61746164);
    setUint32(length - pos - 4);

    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
  };

  const deleteAudioFromLibrary = (id) => {
    if (window.confirm("Delete this audio?")) {
      setAudioLibrary(prev => prev.filter(audio => audio.id !== id));
      if (selectedLibraryAudio && selectedLibraryAudio.id === id) {
        setSelectedLibraryAudio(null);
        setMusicFile(null);
        if (audioRef.current) audioRef.current.src = "";
      }
    }
  };

  const useAudioFromLibrary = (audio) => {
    let usableAudio = audio;
    if (!audio.url && audio.base64) {
      try {
        const byteString = atob(audio.base64.split(',')[1]);
        const mimeType = audio.base64.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeType });
        const freshUrl = URL.createObjectURL(blob);
        usableAudio = { ...audio, url: freshUrl };
        setAudioLibrary(prev => prev.map(a => a.id === audio.id ? usableAudio : a));
      } catch (err) {
        alert("Failed to load audio: " + err.message);
        return;
      }
    }
    setSelectedLibraryAudio(usableAudio);
    alert(`✅ "${usableAudio.name}" applied!`);
  };

  const downloadAudioFromLibrary = (audio) => {
    try {
      const link = document.createElement('a');
      link.href = audio.base64 || audio.url;
      link.download = audio.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  };

  // Subtitle Generation (Screen Capture Method)
  const generateSubtitlesViaScreenCapture = async () => {
    if (!currentPreviewUrl || !videoRef.current) {
      alert("Please load a video first.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("❌ Speech Recognition not supported. Use Chrome/Edge.");
      return;
    }

    alert(
      "🎯 Tab Audio Capture:\n\n" +
      "1️⃣ Select 'Chrome Tab'\n" +
      "2️⃣ Choose THIS tab\n" +
      "3️⃣ ✅ Enable 'Share tab audio'\n" +
      "4️⃣ Click Share"
    );

    setGeneratingSubtitles(true);
    setSubtitles([]);
    subtitleCollectedRef.current = [];
    subtitleShouldRestartRef.current = true;
    setSubtitleStatus("🎯 Requesting tab audio...");

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const audioTracks = displayStream.getAudioTracks();
      if (audioTracks.length === 0) {
        displayStream.getTracks().forEach(t => t.stop());
        alert("❌ No audio! Enable 'Share tab audio'");
        setGeneratingSubtitles(false);
        setSubtitleStatus("");
        return;
      }

      const audioStream = new MediaStream(audioTracks);
      mediaStreamRef.current = displayStream;
      displayStream.getVideoTracks().forEach(track => track.stop());

      setSubtitleStatus("✅ Audio captured! Starting...");

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(audioStream);
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);

      subtitleStartTimeRef.current = Date.now();

      const startRecognition = () => {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = subtitleLang;

        recognition.onstart = () => {
          setSubtitleStatus("🎤 Listening...");
        };

        recognition.onresult = (event) => {
          let interimText = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const text = event.results[i][0].transcript.trim();
            
            if (event.results[i].isFinal && text) {
              const elapsed = (Date.now() - subtitleStartTimeRef.current) / 1000;
              const dur = Math.max(2, Math.min(5, text.split(' ').length * 0.4));
              const segment = {
                id: Date.now() + i + Math.random(),
                start: Math.max(0, elapsed - dur),
                end: elapsed,
                text: text,
              };
              subtitleCollectedRef.current.push(segment);
              setSubtitles([...subtitleCollectedRef.current]);
              setSubtitleStatus(`✅ ${subtitleCollectedRef.current.length} segments`);
            } else {
              interimText += text + " ";
            }
          }
          if (interimText.trim()) {
            setSubtitleStatus(`💬 "${interimText.trim().substring(0, 30)}..."`);
          }
        };

        recognition.onerror = (event) => {
          if (event.error === 'not-allowed') {
            subtitleShouldRestartRef.current = false;
            alert("❌ Mic permission needed");
            stopSubtitleGeneration();
          }
        };

        recognition.onend = () => {
          if (subtitleShouldRestartRef.current && videoRef.current && !videoRef.current.ended) {
            setTimeout(() => {
              try { startRecognition(); } catch(e) {}
            }, 100);
          } else {
            cleanupSubtitleGeneration();
            if (subtitleCollectedRef.current.length === 0) {
              alert("❌ No subtitles captured");
            } else {
              alert(`✅ ${subtitleCollectedRef.current.length} subtitles generated!`);
            }
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      };

      startRecognition();
      await new Promise(r => setTimeout(r, 500));
      
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      await videoRef.current.play();

      videoRef.current.onended = () => {
        subtitleShouldRestartRef.current = false;
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch(e) {}
        }
      };

      displayStream.getTracks().forEach(track => {
        track.onended = () => {
          subtitleShouldRestartRef.current = false;
          if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch(e) {}
          }
        };
      });

    } catch (err) {
      console.error("Screen capture error:", err);
      setGeneratingSubtitles(false);
      setSubtitleStatus("");
      alert("Error: " + err.message);
    }
  };

  const generateSubtitlesViaMic = async () => {
    if (!currentPreviewUrl || !videoRef.current) {
      alert("Please load a video first.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("❌ Not supported. Use Chrome/Edge.");
      return;
    }

    const ready = window.confirm(
      "📢 MICROPHONE MODE\n\n" +
      "Requires max volume + mic near speaker.\n\n" +
      "Continue?"
    );
    if (!ready) return;

    setGeneratingSubtitles(true);
    setSubtitles([]);
    subtitleCollectedRef.current = [];
    subtitleShouldRestartRef.current = true;
    setSubtitleStatus("🎤 Initializing...");

    try {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      subtitleStartTimeRef.current = Date.now();

      const startRecognition = () => {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = subtitleLang;

        recognition.onstart = () => setSubtitleStatus("🎤 Listening...");

        recognition.onresult = (event) => {
          let interimText = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const text = event.results[i][0].transcript.trim();
            if (event.results[i].isFinal && text) {
              const elapsed = (Date.now() - subtitleStartTimeRef.current) / 1000;
              const dur = Math.max(2, Math.min(5, text.split(' ').length * 0.4));
              const segment = {
                id: Date.now() + i + Math.random(),
                start: Math.max(0, elapsed - dur),
                end: elapsed,
                text: text,
              };
              subtitleCollectedRef.current.push(segment);
              setSubtitles([...subtitleCollectedRef.current]);
              setSubtitleStatus(`✅ ${subtitleCollectedRef.current.length} segments`);
            } else {
              interimText += text + " ";
            }
          }
          if (interimText.trim()) {
            setSubtitleStatus(`💬 "${interimText.trim().substring(0, 30)}..."`);
          }
        };

        recognition.onerror = (event) => {
          if (event.error === 'not-allowed') {
            subtitleShouldRestartRef.current = false;
            alert("❌ Mic denied");
            cleanupSubtitleGeneration();
          }
        };

        recognition.onend = () => {
          if (subtitleShouldRestartRef.current && videoRef.current && !videoRef.current.ended) {
            setTimeout(() => {
              try { startRecognition(); } catch(e) {}
            }, 100);
          } else {
            cleanupSubtitleGeneration();
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      };

      startRecognition();
      await new Promise(r => setTimeout(r, 500));
      await videoRef.current.play();

      videoRef.current.onended = () => {
        subtitleShouldRestartRef.current = false;
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch(e) {}
        }
      };

    } catch (err) {
      console.error("Subtitle error:", err);
      cleanupSubtitleGeneration();
      alert("Error: " + err.message);
    }
  };

  const cleanupSubtitleGeneration = () => {
    setGeneratingSubtitles(false);
    setSubtitleStatus("");
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch(e) {}
      audioContextRef.current = null;
    }
  };

  const generateSubtitles = () => {
    if (subtitleMethod === 'screen') {
      generateSubtitlesViaScreenCapture();
    } else {
      generateSubtitlesViaMic();
    }
  };

  const stopSubtitleGeneration = () => {
    subtitleShouldRestartRef.current = false;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    if (videoRef.current) videoRef.current.pause();
    cleanupSubtitleGeneration();
  };

  const clearSubtitles = () => {
    if (window.confirm("Clear all subtitles?")) {
      setSubtitles([]);
      subtitleCollectedRef.current = [];
      setCurrentSubtitle("");
    }
  };

  const editSubtitle = (id, newText) => {
    const updated = subtitles.map(s => s.id === id ? { ...s, text: newText } : s);
    setSubtitles(updated);
    subtitleCollectedRef.current = updated;
  };

  const deleteSubtitle = (id) => {
    const updated = subtitles.filter(s => s.id !== id);
    setSubtitles(updated);
    subtitleCollectedRef.current = updated;
  };

  const addManualSubtitle = () => {
    const text = prompt("Enter subtitle:");
    if (!text || !text.trim()) return;
    
    const time = videoRef.current ? videoRef.current.currentTime : 0;
    const newSub = {
      id: Date.now() + Math.random(),
      start: Math.max(0, time - 1),
      end: time + 3,
      text: text.trim(),
    };
    const updated = [...subtitles, newSub].sort((a, b) => a.start - b.start);
    setSubtitles(updated);
    subtitleCollectedRef.current = updated;
  };

  // Render Video
  const renderEditedVideo = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const video = videoRef.current;
        if (!video) return reject("No video");

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const ctx = canvas.getContext('2d');

        const stream = canvas.captureStream(30);

        try {
          const videoStream = video.captureStream ? video.captureStream() : video.mozCaptureStream();
          const audioTracks = videoStream.getAudioTracks();
          audioTracks.forEach(track => stream.addTrack(track));
        } catch (e) {
          console.warn("No audio track:", e);
        }

        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
          ? 'video/webm;codecs=vp9' 
          : 'video/webm';
        
        const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2500000 });
        const chunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          resolve(blob);
        };

        recorder.onerror = (e) => reject(e);

        video.currentTime = 0;
        video.muted = false;
        await new Promise(r => setTimeout(r, 100));

        recorder.start();
        await video.play();

        const drawFrame = () => {
          if (video.paused || video.ended) return;

          ctx.filter = `grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) brightness(${filters.brightness}%) contrast(${filters.contrast}%) blur(${filters.blur}px)`;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          ctx.filter = 'none';

          if (textOverlay.visible && textOverlay.text) {
            ctx.font = `bold ${textOverlay.fontSize * 2}px Arial`;
            ctx.fillStyle = textOverlay.color;
            ctx.globalAlpha = textOverlay.opacity / 100;
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 8;
            
            let y;
            if (textOverlay.position === 'top') y = textOverlay.fontSize * 2 + 30;
            else if (textOverlay.position === 'bottom') y = canvas.height - 50;
            else y = canvas.height / 2;

            ctx.fillText(textOverlay.text, canvas.width / 2, y);
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
          }

          if (showSubtitles && subtitles.length > 0) {
            const time = video.currentTime;
            const subtitle = subtitles.find(s => time >= s.start && time <= s.end);
            if (subtitle) {
              ctx.font = `bold 32px Arial`;
              ctx.fillStyle = '#ffffff';
              ctx.textAlign = 'center';
              ctx.shadowColor = 'rgba(0,0,0,1)';
              ctx.shadowBlur = 6;
              ctx.fillText(subtitle.text, canvas.width / 2, canvas.height - 80);
              ctx.shadowBlur = 0;
            }
          }

          if (duration) {
            const percent = Math.min(99, Math.round((video.currentTime / duration) * 100));
            setSaveProgress(percent);
          }

          requestAnimationFrame(drawFrame);
        };

        drawFrame();

        video.onended = () => {
          setTimeout(() => {
            if (recorder.state !== 'inactive') recorder.stop();
          }, 500);
        };

      } catch (err) {
        reject(err);
      }
    });
  };

  const saveProject = async () => {
    if (!currentPreviewUrl) {
      alert("Load a video first.");
      return;
    }

    const useRender = window.confirm(
      "Render with edits baked in?\n\n" +
      "✅ OK = Full render\n" +
      "❌ Cancel = Quick save"
    );

    if (useRender) {
      setSavingProject(true);
      setSaveProgress(0);

      try {
        const blob = await renderEditedVideo();
        const renderedUrl = URL.createObjectURL(blob);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          
          const newProj = {
            id: Date.now(),
            name: (uploadedFiles[0]?.name || "Video").replace(/\.[^/.]+$/, "") + "-edited.webm",
            url: renderedUrl,
            base64: base64data,
            blobSize: blob.size,
            filters: filters,
            text: textOverlay,
            subtitles: subtitles,
            rendered: true,
            date: new Date().toISOString(),
          };

          const updated = [...projects, newProj];
          setProjects(updated);
          
          try {
            localStorage.setItem("magnific_projects", JSON.stringify(updated));
          } catch (e) {
            console.warn("Storage full, session-only");
          }

          setSavingProject(false);
          setSaveProgress(100);
          alert("✅ Saved! Check 'My Projects'");
        };
        reader.readAsDataURL(blob);

      } catch (err) {
        console.error("Render error:", err);
        setSavingProject(false);
        alert("Render failed: " + err.message);
      }
    } else {
      const newProj = {
        id: Date.now(),
        name: uploadedFiles[0]?.name || "Video",
        url: currentPreviewUrl,
        filters: filters,
        text: textOverlay,
        subtitles: subtitles,
        rendered: false,
        date: new Date().toISOString(),
      };
      const updated = [...projects, newProj];
      setProjects(updated);
      localStorage.setItem("magnific_projects", JSON.stringify(updated));
      alert("✅ Project Saved!");
    }
  };

  const deleteProject = (id) => {
    if(window.confirm("Delete project?")) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem("magnific_projects", JSON.stringify(updated));
    }
  };

  const downloadProject = (proj) => {
    try {
      const link = document.createElement('a');
      link.href = proj.base64 || proj.url;
      link.download = proj.name || `magnific-${proj.id}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  };

  const startDownload = () => {
    if (!currentPreviewUrl) return;
    setDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setDownloadComplete(true);
          
          setTimeout(() => {
             const link = document.createElement('a');
             link.href = currentPreviewUrl;
             link.download = 'magnific-export.mp4';
             link.click();
             setDownloadComplete(false);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleProfileChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  
  const saveProfile = () => {
    localStorage.setItem("userData", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  const navItems = [
    { id: "upload", label: "Upload", icon: FiUpload },
    { id: "editor", label: "Editor", icon: FiEdit },
    { id: "projects", label: "Projects", icon: FiFolder },
    { id: "audio-library", label: "Audio", icon: FiMusic },
    { id: "download", label: "Export", icon: FiDownload },
    { id: "profile", label: "Account", icon: FiUser },
  ];

  const getFilterString = () => 
    `grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) brightness(${filters.brightness}%) contrast(${filters.contrast}%) blur(${filters.blur}px)`;

  // ==========================================
  // 🎨 MOBILE-FIRST EDITOR SECTION
  // ==========================================
  const renderEditorSection = () => {
    if (!currentPreviewUrl) {
      return (
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md">
            <FiVideo size={64} className="mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">No Video Loaded</h2>
            <p className="text-gray-400 mb-6">Upload a video to start editing</p>
            <button 
              onClick={() => setActiveTab('upload')}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              Go to Upload
            </button>
          </div>
        </div>
      );
    }

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    // Tool tabs for mobile
    const toolTabs = [
      { id: 'speed', label: 'Speed', icon: FiClock },
      { id: 'effects', label: 'Effects', icon: FiSliders },
      { id: 'text', label: 'Text', icon: FiType },
      { id: 'audio', label: 'Audio', icon: FiMusic },
      { id: 'subtitles', label: 'Subs', icon: FiFileText },
    ];

    return (
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full max-w-7xl mx-auto pb-20 lg:pb-6">
        
        {/* ========================================
            VIDEO PREVIEW SECTION - RESPONSIVE
        ======================================== */}
        <div className="w-full lg:flex-1 flex flex-col">
          {/* Video Canvas */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video group">
            <video 
              ref={videoRef}
              src={currentPreviewUrl}
              style={{ filter: getFilterString() }}
              className="w-full h-full object-contain"
              onClick={togglePlay}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
              onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
              crossOrigin="anonymous"
              playsInline
            />

            {musicFile && <audio ref={audioRef} src={musicFile} loop />}

            {/* Play Button Overlay */}
            {!playing && !savingProject && (
              <div 
                onClick={togglePlay} 
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer hover:bg-black/50 transition z-10"
              >
                <button className="w-16 h-16 md:w-20 md:h-20 bg-yellow-500 rounded-full flex items-center justify-center text-black transform hover:scale-110 transition shadow-lg">
                  <FiPlay size={28} fill="currentColor" className="ml-1" />
                </button>
              </div>
            )}

            {/* Text Overlay */}
            {textOverlay.visible && textOverlay.text && (
              <div 
                className="absolute inset-0 pointer-events-none flex w-full h-full p-4 md:p-8"
                style={{ 
                  alignItems: textOverlay.position === 'top' ? 'flex-start' : textOverlay.position === 'bottom' ? 'flex-end' : 'center',
                  justifyContent: 'center'
                }}
              >
                <div 
                  style={{ 
                    fontSize: `${textOverlay.fontSize}px`, 
                    color: textOverlay.color, 
                    opacity: textOverlay.opacity/100,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    fontWeight: 'bold',
                  }}
                  className="text-center max-w-full px-2"
                >
                  {textOverlay.text}
                </div>
              </div>
            )}

            {/* Current Subtitle Display */}
            {showSubtitles && currentSubtitle && (
              <div className="absolute bottom-16 md:bottom-20 left-0 right-0 pointer-events-none flex justify-center px-4 md:px-8 z-15">
                <div 
                  className="bg-black/80 px-3 py-2 md:px-4 md:py-2 rounded text-white text-center max-w-full md:max-w-3xl"
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,1)',
                  }}
                >
                  {currentSubtitle}
                </div>
              </div>
            )}

            {/* Subtitle Generation Status */}
            {generatingSubtitles && subtitleStatus && (
              <div className="absolute top-4 left-4 right-4 bg-purple-600/95 px-3 py-2 md:px-4 md:py-2 rounded-lg text-white text-xs md:text-sm font-semibold z-25 flex items-center gap-2 animate-pulse">
                <FiMic className="flex-shrink-0" />
                <span className="truncate">{subtitleStatus}</span>
              </div>
            )}

            {/* Rendering Progress */}
            {savingProject && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-30 p-4">
                <div className="text-yellow-500 text-xl md:text-2xl font-bold mb-4 text-center">
                  Rendering Video...
                </div>
                <div className="w-full max-w-xs md:max-w-md bg-gray-700 h-3 md:h-4 rounded-full overflow-hidden mb-2">
                  <div 
                    className="bg-yellow-500 h-full transition-all duration-300" 
                    style={{width: `${saveProgress}%`}}
                  />
                </div>
                <p className="text-gray-300 text-sm md:text-base">{saveProgress}%</p>
                <p className="text-gray-500 text-xs md:text-sm mt-2">Don't close tab</p>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-3 md:p-4 z-20">
              <div className="flex items-center gap-2 md:gap-4">
                <button 
                  onClick={togglePlay} 
                  className="text-white hover:text-yellow-500 p-1 md:p-2 flex-shrink-0"
                >
                  {playing ? <FiPause size={20}/> : <FiPlay size={20}/>}
                </button>
                
                <div 
                  className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden relative cursor-pointer hover:h-2 transition-all"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-yellow-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <span className="text-xs text-gray-300 whitespace-nowrap flex-shrink-0">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            TOOL PANEL - MOBILE RESPONSIVE
        ======================================== */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          
          {/* Mobile: Tab Navigation */}
          <div className="lg:hidden overflow-x-auto">
            <div className="flex gap-2 pb-2 min-w-max">
              {toolTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveToolTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all
                    ${activeToolTab === tab.id 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }
                  `}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tool Content Panel */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            
            {/* Desktop: All Tools Visible, Mobile: Tab-Based */}
            <div className="max-h-[60vh] lg:max-h-[calc(100vh-200px)] overflow-y-auto">
              
              {/* Speed Control */}
              {(activeToolTab === 'speed' || window.innerWidth >= 1024) && (
                <div className="p-4 border-b border-gray-700 space-y-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <FiClock /> Speed Control
                  </h3>
                  <div className="grid grid-cols-4 gap-2 bg-gray-900 p-1 rounded-lg">
                    {[0.5, 1, 1.5, 2].map(sp => (
                      <button 
                        key={sp}
                        onClick={() => setVideoSpeed(sp)}
                        className={`
                          py-2 rounded-md text-sm font-semibold transition
                          ${videoSpeed === sp 
                            ? 'bg-yellow-500 text-black' 
                            : 'text-gray-400 hover:bg-gray-800'
                          }
                        `}
                      >
                        {sp}x
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    {videoSpeed < 1 ? "⚡ Slow Motion" : videoSpeed > 1 ? "🔥 Fast Forward" : "Normal Speed"}
                  </p>
                </div>
              )}

              {/* Effects */}
              {(activeToolTab === 'effects' || window.innerWidth >= 1024) && (
                <div className="p-4 border-b border-gray-700 space-y-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <FiSliders /> Effects
                  </h3>
                  
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">
                      Contrast ({filters.contrast}%)
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      value={filters.contrast} 
                      onChange={(e)=>setFilters({...filters, contrast: Number(e.target.value)})} 
                      className="w-full accent-yellow-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">
                      Brightness ({filters.brightness}%)
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      value={filters.brightness} 
                      onChange={(e)=>setFilters({...filters, brightness: Number(e.target.value)})} 
                      className="w-full accent-yellow-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">
                      Blur ({filters.blur}px)
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      value={filters.blur} 
                      onChange={(e)=>setFilters({...filters, blur: Number(e.target.value)})} 
                      className="w-full accent-yellow-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button 
                      onClick={()=>applyPreset('vintage')} 
                      className="bg-gray-700 p-2 rounded text-xs hover:bg-gray-600 text-white"
                    >
                      Vintage
                    </button>
                    <button 
                      onClick={()=>applyPreset('bw')} 
                      className="bg-gray-700 p-2 rounded text-xs hover:bg-gray-600 text-white"
                    >
                      B&W
                    </button>
                    <button 
                      onClick={()=>applyPreset('vivid')} 
                      className="bg-gray-700 p-2 rounded text-xs hover:bg-gray-600 text-white"
                    >
                      Vivid
                    </button>
                    <button 
                      onClick={()=>applyPreset('restore')} 
                      className="bg-gray-700 p-2 rounded text-xs hover:bg-gray-600 text-white"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* Text Overlay */}
              {(activeToolTab === 'text' || window.innerWidth >= 1024) && (
                <div className="p-4 border-b border-gray-700 space-y-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <FiType /> Text Overlay
                  </h3>
                  
                  <textarea 
                    placeholder="Add caption..."
                    value={textOverlay.text}
                    onChange={(e)=>updateText('text', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-yellow-500 outline-none resize-none h-20"
                  />

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">
                      Size ({textOverlay.fontSize}px)
                    </label>
                    <input 
                      type="range" 
                      min="12" 
                      max="72" 
                      value={textOverlay.fontSize} 
                      onChange={(e)=>updateText('fontSize', Number(e.target.value))} 
                      className="w-full accent-yellow-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <select 
                      value={textOverlay.position}
                      onChange={(e)=>updateText('position', e.target.value)}
                      className="flex-1 bg-gray-900 border border-gray-700 rounded p-2 text-xs text-white"
                    >
                      <option value="top">Top</option>
                      <option value="center">Center</option>
                      <option value="bottom">Bottom</option>
                    </select>
                    <input 
                      type="color" 
                      value={textOverlay.color} 
                      onChange={(e)=>updateText('color', e.target.value)} 
                      className="h-10 w-14 rounded cursor-pointer border-0 p-0 bg-transparent" 
                      title="Color" 
                    />
                  </div>
                </div>
              )}

              {/* Audio */}
              {(activeToolTab === 'audio' || window.innerWidth >= 1024) && (
                <div className="p-4 border-b border-gray-700 space-y-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <FiMusic /> Audio
                  </h3>
                  
                  <button 
                    onClick={extractSound} 
                    disabled={extractingAudio || !currentPreviewUrl}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    {extractingAudio ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Extracting...
                      </>
                    ) : (
                      <>
                        <FiMusic /> Extract Audio
                      </>
                    )}
                  </button>

                  {selectedLibraryAudio && (
                    <div className="bg-green-900/20 border border-green-700 rounded p-2 text-xs text-green-300">
                      ✅ Using: {selectedLibraryAudio.name}
                    </div>
                  )}
                </div>
              )}

              {/* Subtitles */}
              {(activeToolTab === 'subtitles' || window.innerWidth >= 1024) && (
                <div className="p-4 border-b border-gray-700 space-y-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <FiFileText /> Subtitles
                  </h3>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Language</label>
                    <select 
                      value={subtitleLang}
                      onChange={(e) => setSubtitleLang(e.target.value)}
                      disabled={generatingSubtitles}
                      className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs text-white"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="hi-IN">Hindi</option>
                      <option value="es-ES">Spanish</option>
                      <option value="ar-SA">Arabic</option>
                      <option value="fr-FR">French</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Method</label>
                    <select
                      value={subtitleMethod}
                      onChange={(e) => setSubtitleMethod(e.target.value)}
                      disabled={generatingSubtitles}
                      className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs text-white"
                    >
                      <option value="screen">✅ Tab Audio (Best)</option>
                      <option value="mic">🎤 Microphone</option>
                    </select>
                  </div>

                  {!generatingSubtitles ? (
                    <button 
                      onClick={generateSubtitles}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <FiMic /> Generate
                    </button>
                  ) : (
                    <button 
                      onClick={stopSubtitleGeneration}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 animate-pulse"
                    >
                      <FiMicOff /> Stop
                    </button>
                  )}

                  <button
                    onClick={addManualSubtitle}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <FiPlusCircle /> Add Manual
                  </button>

                  {subtitles.length > 0 && (
                    <>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{subtitles.length} subs</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setShowSubtitles(!showSubtitles)}
                            className={`px-2 py-1 rounded text-xs ${showSubtitles ? 'bg-green-600 text-white' : 'bg-gray-700'}`}
                          >
                            {showSubtitles ? 'ON' : 'OFF'}
                          </button>
                          <button 
                            onClick={clearSubtitles}
                            className="px-2 py-1 rounded bg-red-600/50 text-white hover:bg-red-600"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-900 rounded p-2 max-h-32 overflow-y-auto space-y-1">
                        {subtitles.map(s => (
                          <div key={s.id} className="text-xs flex items-start gap-2 group border-b border-gray-800 pb-1">
                            <span className="text-yellow-500 flex-shrink-0 text-[10px]">
                              {formatTime(s.start)}
                            </span>
                            <input 
                              type="text"
                              value={s.text}
                              onChange={(e) => editSubtitle(s.id, e.target.value)}
                              className="flex-1 bg-transparent border-b border-transparent hover:border-gray-600 focus:border-yellow-500 outline-none text-[11px] text-white"
                            />
                            <button 
                              onClick={() => deleteSubtitle(s.id)}
                              className="opacity-0 group-hover:opacity-100 text-red-400"
                            >
                              <FiTrash2 size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

            </div>

            {/* Action Buttons - Always Visible */}
            <div className="p-4 bg-gray-900 space-y-2">
              <button 
                onClick={saveProject} 
                disabled={savingProject}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <FiSave /> 
                {savingProject ? `${saveProgress}%...` : 'Save Project'}
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  };

  // ==================== OTHER SECTIONS (Unchanged) ====================

  const renderUploadSection = () => (
    <div className="max-w-5xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-white mb-6">Upload Media</h1>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${dragActive ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-gray-500'}`}
        onDragEnter={handleDrag} 
        onDragOver={handleDrag} 
        onDrop={handleDrop} 
        onDragLeave={handleDrag}
      >
        <FiUploadCloud size={48} className="mx-auto text-yellow-500 mb-4" />
        <p className="text-xl text-white mb-2">Drag & Drop Videos</p>
        <p className="text-gray-400 mb-6">or click to browse</p>
        <label className="inline-block cursor-pointer">
          <input type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
          <span className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
            Browse Files
          </span>
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <FiMusic /> Background Music
          </h3>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={handleFileSelect} 
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600" 
          />
        </div>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-white font-bold">Loaded Items:</h3>
          {uploadedFiles.map(f => (
            <div key={f.id} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg text-gray-300">
              <div className="flex items-center gap-3">
                {f.type === 'audio' ? <FiMusic className="text-blue-400"/> : <FiVideo className="text-red-400"/>}
                <span className="truncate max-w-xs">{f.name}</span>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-700 rounded uppercase">{f.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAudioLibrarySection = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Audio Library</h1>
        <div className="text-right text-sm text-gray-400">
          {audioLibrary.length} tracks
        </div>
      </div>

      {audioLibrary.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
          <FiMusic size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No audio yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audioLibrary.map(audio => (
            <div key={audio.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <FiMusic size={24} className="text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{audio.name}</h3>
                  <p className="text-gray-500 text-xs">{formatDate(audio.date)}</p>
                </div>
              </div>

              <audio src={audio.url} controls className="w-full mb-3" style={{height: '32px'}} />

              <div className="flex gap-2">
                <button 
                  onClick={() => useAudioFromLibrary(audio)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm"
                >
                  Use
                </button>
                <button 
                  onClick={() => downloadAudioFromLibrary(audio)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                >
                  <FiDownload size={16} />
                </button>
                <button 
                  onClick={() => deleteAudioFromLibrary(audio.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProjectsSection = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">My Projects</h1>
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-2.5 text-gray-400"/>
          <input 
            placeholder="Search..." 
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 pl-10 pr-4 py-2 rounded-lg border border-gray-700 text-white focus:border-yellow-500 outline-none"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
          <FiVideo size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No projects yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <div key={proj.id} className="bg-gray-800 rounded-xl border border-gray-700 hover:border-yellow-500 transition group overflow-hidden">
              <div className="aspect-video bg-black relative">
                <video src={proj.base64 || proj.url} className="w-full h-full object-cover" />
                {proj.rendered && (
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">
                    ✓ RENDERED
                  </span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button 
                    onClick={() => {
                      setCurrentPreviewUrl(proj.base64 || proj.url);
                      setFilters(proj.filters);
                      setTextOverlay(proj.text);
                      if (proj.subtitles) setSubtitles(proj.subtitles);
                      setActiveTab('editor');
                    }} 
                    className="bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-600 text-sm"
                  >
                    <FiEdit className="inline mr-1" /> Edit
                  </button>
                  <button 
                    onClick={() => downloadProject(proj)} 
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
                  >
                    <FiDownload />
                  </button>
                  <button 
                    onClick={()=>deleteProject(proj.id)} 
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold truncate">{proj.name}</h3>
                <p className="text-gray-400 text-xs">{formatDate(proj.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDownloadSection = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Export Video</h1>
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="mb-6">
          {currentPreviewUrl ? (
            <video src={currentPreviewUrl} controls className="w-full rounded-lg" />
          ) : (
            <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center text-gray-500">
              No preview
            </div>
          )}
        </div>

        {!downloading ? (
          <button 
            onClick={startDownload} 
            className="w-full bg-yellow-500 text-black font-bold py-4 rounded-lg hover:bg-yellow-600 transition"
          >
            Start Rendering
          </button>
        ) : (
          <div>
            <div className="flex justify-between text-white mb-2">
              <span>{downloadComplete ? "Download Started!" : "Rendering..."}</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-yellow-500 h-full transition-all duration-300" 
                style={{width: `${downloadProgress}%`}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Account</h1>
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={user?.photo || "https://via.placeholder.com/150"} 
            alt="User" 
            className="w-20 h-20 rounded-full border-4 border-yellow-500" 
          />
          <div>
            <h2 className="text-xl font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-bold">
              Premium
            </span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input 
              name="firstName" 
              value={formData.firstName || ""} 
              onChange={handleProfileChange} 
              placeholder="First Name" 
              className="bg-gray-900 p-3 rounded border border-gray-700 text-white" 
            />
            <input 
              name="lastName" 
              value={formData.lastName || ""} 
              onChange={handleProfileChange} 
              placeholder="Last Name" 
              className="bg-gray-900 p-3 rounded border border-gray-700 text-white" 
            />
          </div>
          <input 
            name="email" 
            value={formData.email || ""} 
            onChange={handleProfileChange} 
            placeholder="Email" 
            className="w-full bg-gray-900 p-3 rounded border border-gray-700 text-white" 
          />
          
          <button 
            type="button" 
            onClick={saveProfile} 
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case "upload": return renderUploadSection();
      case "editor": return renderEditorSection();
      case "projects": return renderProjectsSection();
      case "audio-library": return renderAudioLibrarySection();
      case "download": return renderDownloadSection();
      case "profile": return renderProfileSection();
      default: return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-yellow-500 mb-4">Magnific</h1>
          <p>Please login</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden" 
          onClick={()=>setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static z-50 w-64 h-full bg-gray-800 border-r border-gray-700 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-yellow-500">MAGNIFIC</h1>
          <button 
            onClick={()=>setSidebarOpen(false)} 
            className="lg:hidden text-gray-400"
          >
            <FiX />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${activeTab === item.id 
                  ? 'bg-yellow-500 text-black font-bold' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={() => setShowLogoutModal(true)} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={()=>setSidebarOpen(true)} 
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiMenu size={24}/>
            </button>
            <h2 className="font-semibold text-base md:text-lg text-gray-300">
              {navItems.find(n=>n.id===activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white">
              <FiBell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                3
              </span>
            </button>
            <img 
              src={user.photo || "https://via.placeholder.com/40"} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full border border-gray-600" 
            />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-black">
          {renderContent()}
        </main>

      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-gray-800 p-6 rounded-xl max-w-sm w-full border border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-white">Logout?</h3>
            <p className="text-gray-400 mb-6">Are you sure?</p>
            <div className="flex gap-3">
              <button 
                onClick={handleLogout} 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
              >
                Yes
              </button>
              <button 
                onClick={()=>setShowLogoutModal(false)} 
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;