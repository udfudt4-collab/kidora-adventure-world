import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdSenseSafeZone } from '@/components/AdSenseSafeZone';
import { useApp } from '@/lib/store';
import type { Screen } from '@/lib/types';

interface ParentsSectionProps {
  initialTab?: 'guide' | 'about' | 'safety' | 'privacy' | 'terms' | 'contact';
  onNavigate: (screen: Screen) => void;
}

type TabType = 'guide' | 'about' | 'safety' | 'privacy' | 'terms' | 'contact';

export function ParentsSection({ initialTab = 'guide', onNavigate }: ParentsSectionProps) {
  const { profile } = useApp();
  const [tab, setTab] = useState<TabType>(initialTab);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'General Question', message: '' });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
      <Navbar currentScreen="parents" onNavigate={onNavigate} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 animate-pop-in">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            <span>🛡️</span> Safe & Verified Learning Space
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-800 tracking-tight mb-2">
            Parent Sanctuary & Safety Center
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Kidora is built with a child-first philosophy: zero invasive tracking, positive screen time, and research-grounded developmental activities.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-8 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          {[
            { id: 'guide' as TabType, label: 'Parent Guide', emoji: '📖' },
            { id: 'about' as TabType, label: 'About Kidora', emoji: '🌟' },
            { id: 'safety' as TabType, label: 'Child Safety & COPPA', emoji: '🛡️' },
            { id: 'privacy' as TabType, label: 'Privacy Policy', emoji: '🔒' },
            { id: 'terms' as TabType, label: 'Terms of Use', emoji: '📜' },
            { id: 'contact' as TabType, label: 'Contact Us', emoji: '✉️' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`btn-press px-3.5 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-1.5 ${
                tab === t.id
                  ? 'bg-emerald-600 text-white shadow-soft scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Cards */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-soft p-6 sm:p-10 mb-8 space-y-6">
          {/* TAB 1: PARENT GUIDE */}
          {tab === 'guide' && (
            <div className="space-y-6 animate-pop-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Co-Learning & Screen Time</span>
                <h2 className="text-2xl font-black font-display text-slate-800 mt-1">The Kidora Parent Guide</h2>
                <p className="text-xs text-slate-500 mt-1">How to make the most of your child's learning journey.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-2">
                  <div className="text-2xl mb-1">⏱️</div>
                  <h3 className="text-sm font-black font-display text-slate-800">Balanced Screen Time</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-body">
                    We recommend 15 to 30 minutes of intentional gameplay per session. Kidora's structured daily quests are designed to conclude with a natural stopping point, preventing infinite dopamine loops.
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-2">
                  <div className="text-2xl mb-1">🤝</div>
                  <h3 className="text-sm font-black font-display text-slate-800">Active Co-Play</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-body">
                    Sit with your child during story choices or math puzzles. Ask open-ended questions like: "Why did you choose that path?" or "How did you know 4 plus 3 makes 7?"
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-2">
                  <div className="text-2xl mb-1">🌟</div>
                  <h3 className="text-sm font-black font-display text-slate-800">Praise the Process, Not Just Speed</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-body">
                    Celebrate perseverance when a challenge is difficult. Our mascot Kido encourages resilience: mistakes are simply clues toward the correct answer!
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-2">
                  <div className="text-2xl mb-1">🌱</div>
                  <h3 className="text-sm font-black font-display text-slate-800">Living Garden Milestone</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-body">
                    Check your child's <em>My Kidora Sanctuary</em> together. Watch their garden sprout from a seed to an apple tree as they complete science and logic activities over the days!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT KIDORA */}
          {tab === 'about' && (
            <div className="space-y-6 animate-pop-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Our Mission & Educational Vision</span>
                <h2 className="text-2xl font-black font-display text-slate-800 mt-1">About Kidora Adventure World</h2>
                <p className="text-xs text-slate-500 mt-1">Transforming digital screen time into an imaginative world of growth.</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Kidora Adventure World was created by parents, educators, and creative technologists who noticed a glaring problem with children's apps: too many were either chaotic advertisement traps or dry, repetitive quizzes.
              </p>

              <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200/80 space-y-2">
                <h3 className="text-sm font-black font-display text-amber-900">Our 3 Core Pillars:</h3>
                <ul className="space-y-1.5 text-xs text-amber-800">
                  <li>✨ <strong>Living World Context:</strong> Children learn through meaningful adventures, where math fuels rockets and phonics unlocks ancient jungle gates.</li>
                  <li>🛡️ <strong>Uncompromising Safety:</strong> No social media feeds, zero chatrooms with strangers, and zero behavioral tracking.</li>
                  <li>🎨 <strong>Creative Agency:</strong> Every child is the hero of their world, customizing their companion and bringing their drawings directly to life.</li>
                </ul>
              </div>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <h4 className="font-bold text-slate-800">Educational Standards Alignment</h4>
                <p>
                  Our learning activities are benchmarked against early childhood learning frameworks, covering early numeracy, phonetic letter-sound relationships, spatial working memory, and scientific curiosity for children aged 4 to 10.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CHILD SAFETY & COPPA */}
          {tab === 'safety' && (
            <div className="space-y-6 animate-pop-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Privacy By Design</span>
                <h2 className="text-2xl font-black font-display text-slate-800 mt-1">Children's Privacy & Safety Policy</h2>
                <p className="text-xs text-slate-500 mt-1">COPPA (Children's Online Privacy Protection Act) & GDPR-K Compliance</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                  <span>🛡️</span>
                  <span>Our Strict "Zero Data Harvesting" Promise</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Kidora does NOT require or collect any personal identifiable information (PII) from children.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <h3 className="font-bold text-slate-800 text-sm">1. What We DO NOT Collect:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>We do NOT collect children's full names or family names.</li>
                  <li>We do NOT collect email addresses, phone numbers, or home addresses from children.</li>
                  <li>We do NOT collect real photographs, voice recordings, or videos.</li>
                  <li>We do NOT track exact physical geolocation.</li>
                  <li>We do NOT provide public chatrooms, direct messaging, or social networking features.</li>
                </ul>

                <h3 className="font-bold text-slate-800 text-sm mt-4">2. Localized Offline Storage:</h3>
                <p>
                  All avatar customizations, game stars, and drawings are stored securely on the user's local device (using modern browser localStorage) so children can continue their adventures safely without transmitting personal identifiers.
                </p>

                <h3 className="font-bold text-slate-800 text-sm mt-4">3. Child-Directed Advertising Rules:</h3>
                <p>
                  Any future advertisements on Kidora strictly comply with Google's Child-Directed Content policies. We do NOT permit behavioral tracking, retargeting pixels, or personalized advertising directed at children.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY POLICY */}
          {tab === 'privacy' && (
            <div className="space-y-6 animate-pop-in text-xs text-slate-600 leading-relaxed">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Legal Document</span>
                <h2 className="text-2xl font-black font-display text-slate-800 mt-1">Privacy Policy</h2>
                <p className="text-[11px] text-slate-400">Last updated: August 2026 | Effective immediately</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-sm">1. Introduction</h3>
                <p>
                  Welcome to Kidora Adventure World ("Kidora", "we", "our"). We are committed to protecting the privacy of children, parents, and all users of our educational website and mobile applications. This policy explains our data practices in full compliance with global standards, including COPPA, GDPR, and Google Publisher Policies.
                </p>

                <h3 className="font-bold text-slate-800 text-sm">2. Information Collection and Use</h3>
                <p>
                  Kidora does not require user registration with personal data to access games, stories, or learning content. Child explorer nicknames entered in the onboarding screen are stored locally on the client device.
                </p>

                <h3 className="font-bold text-slate-800 text-sm">3. Google AdSense & Third-Party Vendors</h3>
                <p>
                  Third party vendors, including Google, may use cookies to serve non-personalized, family-safe advertisements based on a user's prior visits to websites. Because our content is directed at children under the age of 13, all advertising requests are flagged as child-directed (tagForChildDirectedTreatment), ensuring that no personalized profiling or behavioral remarketing occurs.
                </p>

                <h3 className="font-bold text-slate-800 text-sm">4. Parental Rights</h3>
                <p>
                  Parents have the absolute right to review, delete, or manage any stored preferences on their child's device by clearing browser cache/local storage at any time or contacting us at <code>privacy@kidora-adventure.com</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: TERMS OF USE */}
          {tab === 'terms' && (
            <div className="space-y-6 animate-pop-in text-xs text-slate-600 leading-relaxed">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Legal Terms</span>
                <h2 className="text-2xl font-black font-display text-slate-800 mt-1">Terms of Service</h2>
                <p className="text-[11px] text-slate-400">Last updated: August 2026</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-sm">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using Kidora Adventure World, you agree to comply with and be bound by these Terms of Service. If you are a parent or guardian, you agree to supervise your child's access and usage.
                </p>

                <h3 className="font-bold text-slate-800 text-sm">2. Educational & Entertainment Use</h3>
                <p>
                  All content, artwork, characters (Kido, Ria, Momo, Tiko, Lumi), and games provided on Kidora are for non-commercial educational and entertainment purposes. Unauthorized reproduction or reverse-engineering is strictly prohibited.
                </p>

                <h3 className="font-bold text-slate-800 text-sm">3. Disclaimer</h3>
                <p>
                  Kidora is provided on an "as is" and "as available" basis. While we strive for 100% uptime and pedagogical excellence, we make no warranties regarding uninterrupted availability.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT US */}
          {tab === 'contact' && (
            <div className="space-y-6 animate-pop-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Get In Touch</span>
                <h2 className="text-2xl font-black font-display text-slate-800 mt-1">Contact Us & Support</h2>
                <p className="text-xs text-slate-500 mt-1">Have feedback, teacher inquiries, or safety questions? We'd love to hear from you.</p>
              </div>

              {contactSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-3">
                  <div className="text-5xl">💌</div>
                  <h3 className="text-xl font-black font-display text-emerald-800">Message Received!</h3>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you for reaching out to Kidora Adventure World. Our team will review your inquiry and reply within 24–48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setContactSubmitted(false); setContactForm({ name: '', email: '', subject: 'General Question', message: '' }); }}
                    className="btn-press bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }}
                  className="space-y-4 max-w-lg"
                >
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Parent or Educator Name"
                      className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Topic</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-sky-500 bg-white"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Parent Feedback">Parent Feedback</option>
                      <option value="Teacher/School Inquiry">Teacher/School Inquiry</option>
                      <option value="Privacy & Safety">Privacy & Safety Inquiry</option>
                      <option value="Bug Report">Bug Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we help you or your child?"
                      className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-press bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black font-display text-xs px-6 py-3.5 rounded-xl shadow-soft cursor-pointer"
                  >
                    Send Message to Kidora Team 🚀
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* AdSense Safe Zone */}
        <AdSenseSafeZone format="horizontal" />
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
