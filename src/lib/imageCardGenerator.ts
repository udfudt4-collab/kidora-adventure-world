// Generates a rich, official Certificate of Excellence using the Kidora template artwork with seamless personalization

export interface CardData {
  childName: string;
  emoji?: string;
  headline?: string;
  subtext?: string;
  stars: number;
  badgeName?: string;
  theme?: string;
  missionType?: string;
  petEmoji?: string;
}

function getSubjectCitation(missionType?: string, badgeName?: string, stars = 3): string {
  const type = (missionType || badgeName || '').toLowerCase();
  
  if (stars <= 1) {
    if (type.includes('math') || type.includes('abacus') || type.includes('number')) {
      return 'For courageous effort, curiosity, and active learning dedication in Mathematics.';
    }
    if (type.includes('word') || type.includes('read') || type.includes('vocab')) {
      return 'For wonderful effort, curiosity, and active learning steps in Reading & Words.';
    }
    if (type.includes('brain') || type.includes('logic') || type.includes('puzzle')) {
      return 'For enthusiastic participation, curiosity, and learning steps in Logic & Puzzles.';
    }
    if (type.includes('science') || type.includes('lab') || type.includes('dino') || type.includes('space') || type.includes('ocean')) {
      return 'For curious exploration, active inquiry, and learning enthusiasm in Science.';
    }
    if (type.includes('creat') || type.includes('art') || type.includes('draw')) {
      return 'For joyful creativity, colorful imagination, and learning expression in the Arts.';
    }
    return 'For courageous effort, curiosity, and enthusiastic learning dedication.';
  }

  if (stars === 2) {
    if (type.includes('math') || type.includes('abacus') || type.includes('number')) {
      return 'For strong problem-solving skills, active calculation, and notable progress in Mathematics.';
    }
    if (type.includes('word') || type.includes('read') || type.includes('vocab')) {
      return 'For strong reading comprehension, growing vocabulary, and notable progress in Words.';
    }
    if (type.includes('brain') || type.includes('logic') || type.includes('puzzle')) {
      return 'For sharp deductive reasoning, puzzle solving, and notable progress in Logic.';
    }
    if (type.includes('science') || type.includes('lab') || type.includes('dino') || type.includes('space') || type.includes('ocean')) {
      return 'For keen scientific observation, curiosity, and notable progress in Discovery.';
    }
    if (type.includes('creat') || type.includes('art') || type.includes('draw')) {
      return 'For expressive artistic imagination, vibrant colors, and notable progress in Creative Arts.';
    }
    return 'For strong analytical thinking, dedicated practice, and notable learning progress.';
  }

  // 3 Stars Mastery
  if (type.includes('math') || type.includes('abacus') || type.includes('number')) {
    return 'For outstanding excellence, perseverance, and problem-solving mastery in Mathematics.';
  }
  if (type.includes('word') || type.includes('read') || type.includes('vocab')) {
    return 'For exceptional reading comprehension, vocabulary mastery, and creative linguistic expression.';
  }
  if (type.includes('brain') || type.includes('logic') || type.includes('puzzle')) {
    return 'For superior deductive reasoning, critical thinking, and advanced puzzle-solving.';
  }
  if (type.includes('science') || type.includes('lab') || type.includes('dino') || type.includes('space') || type.includes('ocean')) {
    return 'For extraordinary scientific curiosity, keen observation, and brilliant natural discovery.';
  }
  if (type.includes('creat') || type.includes('art') || type.includes('draw')) {
    return 'For remarkable artistic imagination, innovative thinking, and expressive creativity.';
  }
  if (type.includes('story') || type.includes('castle') || type.includes('jungle')) {
    return 'For outstanding narrative comprehension, empathy, and active listening excellence.';
  }
  return 'For outstanding excellence, perseverance, and problem-solving skills in Mathematics.';
}

function generateCertificateId(childName: string): string {
  const hash = Math.abs((childName || 'Scholar').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * 31 + new Date().getDate());
  const code = (hash % 90000 + 10000).toString();
  return `KID-${new Date().getFullYear()}-${code}`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

export async function generateAchievementImageBlob(data: CardData): Promise<Blob> {
  const width = 1080;
  const height = 1530; // Matches 723x1024 template aspect ratio
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  try {
    // 1. Draw the master Kidora Adventure Academy certificate artwork
    const templateImg = await loadImage('/assets/certificate_template.jpg');
    ctx.drawImage(templateImg, 0, 0, width, height);

    // 2. Seamlessly clean the customizable center zone
    // Coordinates: from below "THIS IS PROUDLY PRESENTED TO" (~660px) to above avatar/seal (~1040px)
    const cleanZoneY = height * 0.445; // ~680px
    const cleanZoneH = height * 0.235; // ~360px
    const cleanZoneW = width * 0.72;   // ~780px
    const cleanZoneX = (width - cleanZoneW) / 2;

    ctx.save();
    // Warm ivory parchment gradient to match the exact background texture
    const parchmentGrad = ctx.createLinearGradient(0, cleanZoneY, 0, cleanZoneY + cleanZoneH);
    parchmentGrad.addColorStop(0, '#fefdfb');
    parchmentGrad.addColorStop(0.5, '#fcfaf6');
    parchmentGrad.addColorStop(1, '#fefdfb');
    ctx.fillStyle = parchmentGrad;
    ctx.fillRect(cleanZoneX, cleanZoneY, cleanZoneW, cleanZoneH);
    ctx.restore();

    // 3. Render Child's Name in Large Elegant Script (Completely Clean & Centered)
    const nameY = cleanZoneY + 105;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0f172a'; // Deep midnight slate
    ctx.font = 'italic bold 74px "Brush Script MT", "Caveat", "Dancing Script", Georgia, serif';
    ctx.fillText(data.childName || 'Scholar', width / 2, nameY);

    // Golden underline flourish
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 220, nameY + 18);
    ctx.lineTo(width / 2 + 220, nameY + 18);
    ctx.stroke();

    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(width / 2, nameY + 18, 5, 0, Math.PI * 2);
    ctx.fill();

    // 4. Dynamic Stars & Achievement Level Pill
    const pillY = nameY + 80;
    const starCount = Math.max(1, Math.min(3, data.stars || 3));
    const ratingText = starCount >= 3 ? 'Master Level (3/3 Stars)' : starCount === 2 ? 'Advanced Level (2/3 Stars)' : 'Explorer Level (1 Star)';
    const starIcons = '⭐'.repeat(starCount);

    ctx.save();
    ctx.fillStyle = '#1e3a8a'; // Royal Navy Blue
    ctx.strokeStyle = '#d97706'; // Gold Border
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(width / 2 - 270, pillY - 26, 540, 54, 27);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fef08a'; // Bright Star Gold
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`${starIcons}   ${ratingText}`, width / 2, pillY + 8);
    ctx.restore();

    // 5. Dynamic Citation Description Text (Seamless on Ivory Background)
    const descY = pillY + 62;
    const citationText = getSubjectCitation(data.missionType, data.badgeName, data.stars);

    ctx.fillStyle = '#334155';
    ctx.font = '500 22px sans-serif';

    const maxLineW = cleanZoneW - 80;
    const words = citationText.split(' ');
    let line = '';
    const lines: string[] = [];
    for (let n = 0; n < words.length; n++) {
      const testLine = line + (words[n] ?? '') + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxLineW && n > 0) {
        lines.push(line.trim());
        line = (words[n] ?? '') + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    lines.forEach((l, idx) => {
      ctx.fillText(l, width / 2, descY + (idx * 30));
    });

    // 6. Dynamic Date & Certificate ID Footer Bar (Seamlessly Covers Bar)
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const certId = generateCertificateId(data.childName || 'Scholar');
    const barY = height * 0.915; // ~1400px
    const barW = 740;

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(width / 2 - barW / 2, barY - 22, barW, 46, 23);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#475569';
    ctx.font = '600 16px sans-serif';
    ctx.fillText(`📅  ${dateStr}   ⭐   Kidora Academy   ⭐   Certificate No. ${certId}`, width / 2, barY + 7);
    ctx.restore();

  } catch (err) {
    console.error('Error drawing template, using programmatic fallback:', err);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('KIDORA ADVENTURE ACADEMY', width / 2, 200);
    ctx.fillText(data.childName, width / 2, 400);
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create image blob'));
    }, 'image/png');
  });
}

export async function shareAchievementAsImage(data: CardData): Promise<{ shared: boolean; downloaded: boolean }> {
  try {
    const blob = await generateAchievementImageBlob(data);
    const fileName = `Kidora-Certificate-${(data.childName || 'Scholar').replace(/\s+/g, '-')}.png`;
    const file = new File([blob], fileName, { type: 'image/png' });

    // Check if Web Share API with files is supported
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Certificate of Excellence: ${data.childName}`,
        text: `🎓 Proud moment! Here is ${data.childName}'s official Certificate of Excellence from Kidora Adventure Academy! 🌟`,
        files: [file],
      });
      return { shared: true, downloaded: false };
    }

    // Fallback: Download the clean PNG certificate image and open WhatsApp
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Open WhatsApp
    const waText = `🎓 *Proud moment!* Here is *${data.childName}*'s official Certificate of Excellence from *Kidora Adventure Academy*! 🌟`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    return { shared: false, downloaded: true };
  } catch (err) {
    console.error('Error sharing achievement image:', err);
    return { shared: false, downloaded: false };
  }
}
