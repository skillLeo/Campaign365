'use client';
import { PlusSquare, ListChecks, RadioTower, MessageSquareQuote, Eye, Save } from 'lucide-react';

const QUESTION_TYPES = [
  ['Single Choice', 'Fast voter pulse checks and polling'],
  ['Long Text', 'Capture detailed sentiment or issue notes'],
  ['Rating Scale', 'Track intensity or candidate favorability'],
  ['Contact Consent', 'Request opt-in for follow-up outreach'],
];

const QUESTIONS = [
  { order: 1, type: 'Single Choice', title: 'Which issue matters most to your household right now?' },
  { order: 2, type: 'Rating Scale', title: 'How likely are you to vote on election day?' },
  { order: 3, type: 'Long Text', title: 'What would you like the campaign to address first?' },
];

export default function SurveyBuilderPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Survey Builder</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Assemble voter surveys, canvassing forms, and polling questionnaires with reusable question blocks.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 inline-flex items-center gap-2">
            <Eye size={15} />
            Preview
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2" style={{ backgroundColor: 'var(--tenant-primary)' }}>
            <Save size={15} />
            Save builder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[310px_minmax(0,1fr)] gap-4 sm:gap-5">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <PlusSquare size={16} style={{ color: 'var(--tenant-primary)' }} />
              <h2 className="text-sm font-semibold text-slate-800">Question Palette</h2>
            </div>
            <div className="space-y-3">
              {QUESTION_TYPES.map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-slate-100 p-4 hover:bg-slate-50 transition-colors">
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500 mt-2">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Form Settings</h2>
            <div className="space-y-3">
              {[
                ['Audience', 'Door-to-door persuasion and event follow-up'],
                ['Delivery', 'Mobile canvassing app + web form'],
                ['Completion target', '3 minutes average finish time'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="text-sm text-slate-700 mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-800">Neighborhood Persuasion Check-In</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Draft form with live mobile preview structure.</p>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--tenant-primary)' }}>
              <PlusSquare size={15} />
              Add question
            </button>
          </div>

          <div className="space-y-4">
            {QUESTIONS.map(question => (
              <div key={question.order} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--tenant-primary)' }}>
                      {question.order}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{question.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{question.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    {question.type === 'Single Choice' && <ListChecks size={16} />}
                    {question.type === 'Rating Scale' && <RadioTower size={16} />}
                    {question.type === 'Long Text' && <MessageSquareQuote size={16} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[28px] border border-slate-100 bg-slate-50 p-5 max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Mobile Preview</p>
            <div className="mt-4 rounded-[24px] bg-white border border-slate-100 p-4 space-y-3">
              <p className="text-sm font-semibold text-slate-800">How likely are you to vote on election day?</p>
              {[1, 2, 3, 4, 5].map(scale => (
                <div key={scale} className="rounded-xl border border-slate-100 px-3 py-2 text-sm text-slate-600">
                  {scale} {scale === 5 ? '- Definitely voting' : ''}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
