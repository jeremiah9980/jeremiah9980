// Lightweight standalone test for the AI agent demo's intent detection logic.
// Uses plain Node `assert` only — no new dependencies.
//
// This works by loading the <script> contents out of
// projects/ai-platform-assistant-live-demo.html and evaluating them in a
// minimal sandboxed context (since the page itself is not a CommonJS
// module and runs in the browser). The script guards its `module.exports`
// assignment with `typeof module !== 'undefined'`, so it remains unchanged
// and safe to run in the browser too.

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadDemoModule() {
  const htmlPath = path.join(__dirname, 'ai-platform-assistant-live-demo.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.ok(scriptMatches.length > 0, 'Expected to find at least one inline <script> block in the demo page');

  // The agent logic lives in the last inline <script> block on the page.
  const scriptSource = scriptMatches[scriptMatches.length - 1][1];

  const sandboxModule = { exports: {} };
  const sandbox = {
    module: sandboxModule,
    document: {
      getElementById: () => null,
      querySelectorAll: () => [],
    },
    sessionStorage: undefined,
    window: undefined,
    console,
  };

  vm.createContext(sandbox);
  vm.runInContext(scriptSource, sandbox, { filename: 'ai-platform-assistant-live-demo.html' });

  assert.ok(sandboxModule.exports && typeof sandboxModule.exports.detectIntent === 'function',
    'Expected the demo script to export detectIntent via module.exports');

  return sandboxModule.exports;
}

function run() {
  const { detectIntent } = loadDemoModule();

  const cases = [
    { input: 'What certifications should I pursue next?', expected: 'certifications' },
    { input: 'Can you draft a recruiter reply for me?', expected: 'recruiter_reply' },
    { input: 'Which resume version should I send?', expected: 'resume_advice' },
    { input: 'Summarize my background please.', expected: 'background_summary' },
    { input: 'How would you modernize a VMware environment?', expected: 'modernization' },
    { input: 'What is the roadmap for next quarter?', expected: 'roadmap' },
    { input: 'How do you approach observability and alerting?', expected: 'observability' },
    { input: 'Tell me about your Terraform CI/CD pipeline.', expected: 'iac_automation' },
    { input: 'What does your Kubernetes platform look like?', expected: 'kubernetes_platform' },
    { input: 'asdkjfh random gibberish text', expected: 'general' },
  ];

  let passed = 0;
  cases.forEach(({ input, expected }) => {
    const actual = detectIntent(input);
    assert.strictEqual(
      actual,
      expected,
      `detectIntent(${JSON.stringify(input)}) expected "${expected}" but got "${actual}"`
    );
    passed += 1;
  });

  console.log(`ai-agent-intent.test.js: ${passed}/${cases.length} intent detection cases passed.`);
}

run();
