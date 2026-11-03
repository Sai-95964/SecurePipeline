import React from 'react';
import { Code, Key, Layers, Package, Container, CheckCircle2, XCircle, AlertCircle, HelpCircle } from 'lucide-react';

export default function ScannerStatus({ scanners }) {
  const toolDefs = [
    {
      id: 'semgrep',
      name: 'Semgrep SAST',
      type: 'Static Code Analysis',
      icon: Code,
      desc: 'Scans source code for command injection, insecure eval, and OWASP Top 10 flaws.',
    },
    {
      id: 'gitleaks',
      name: 'Gitleaks',
      type: 'Secret Detection',
      icon: Key,
      desc: 'Detects hardcoded API keys, tokens, and credentials with automatic secret redaction.',
    },
    {
      id: 'syft',
      name: 'Syft',
      type: 'SBOM Generation',
      icon: Layers,
      desc: 'Generates complete Software Bill of Materials (SBOM) for package auditing.',
    },
    {
      id: 'trivy_fs',
      name: 'Trivy Filesystem',
      type: 'Dependency Scanning',
      icon: Package,
      desc: 'Scans application manifests (requirements.txt, package.json) against known CVEs.',
    },
    {
      id: 'trivy_image',
      name: 'Trivy Image',
      type: 'Container Security',
      icon: Container,
      desc: 'Scans container base images and OS layer packages prior to deployment gating.',
    },
  ];

  const getStatusBadge = (status) => {
    const s = (status || 'UNKNOWN').toUpperCase();
    if (s === 'SUCCESS') {
      return (
        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          SUCCESS
        </span>
      );
    }
    if (s === 'FAILED') {
      return (
        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30">
          <XCircle className="w-3.5 h-3.5" />
          FAILED
        </span>
      );
    }
    if (s === 'NOT_INSTALLED') {
      return (
        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <AlertCircle className="w-3.5 h-3.5" />
          NOT INSTALLED
        </span>
      );
    }
    if (s === 'SKIPPED') {
      return (
        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
          <HelpCircle className="w-3.5 h-3.5" />
          SKIPPED
        </span>
      );
    }
    return (
      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
        {s}
      </span>
    );
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Scanner Health &amp; Execution Status</h3>
        <p className="text-xs text-slate-400">Status of the 5 integrated open-source security tools from the latest scan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {toolDefs.map((tool) => {
          const Icon = tool.icon;
          const statusInfo = scanners?.[tool.id] || {};
          const currentStatus = statusInfo.status || 'not_installed';
          const errMsg = statusInfo.error_message;

          return (
            <div key={tool.id} className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-slate-800 rounded-lg text-sky-400 border border-slate-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">{tool.name}</h4>
                      <span className="text-[11px] text-slate-400">{tool.type}</span>
                    </div>
                  </div>
                  {getStatusBadge(currentStatus)}
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{tool.desc}</p>
              </div>

              {errMsg && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono break-all line-clamp-2">
                  {errMsg}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
