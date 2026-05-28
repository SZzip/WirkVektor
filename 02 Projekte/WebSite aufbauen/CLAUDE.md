# CLAUDE.md — WebGL Website Project

## Project context

This repository contains a WebGL-based interactive website.

Primary goals:

- Deliver a stable, performant, accessible WebGL experience.
- Prefer correctness, validation, graceful degradation, and maintainability over visual shortcuts.
- The application must not silently fail on unsupported devices, shader errors, context loss, invalid assets, or malformed runtime data.

Target stack:

- Runtime: TypeScript
- Bundler: Vite
- Rendering: WebGL2 first, WebGL1 fallback if explicitly supported
- Optional renderer abstraction: Three.js, regl, luma.gl, or custom WebGL
- Styling: CSS modules, Tailwind, or project-defined CSS system
- Testing: Vitest, Playwright, ESLint, TypeScript strict mode

Replace this section if the actual stack differs.

## Claude working rules

Claude treats this file as project context.

Before making non-trivial changes:

- Inspect the existing project structure.
- Identify affected files before editing.
- Explain the implementation plan briefly.
- Do not invent unavailable APIs, package scripts, shader uniforms, asset names, or browser capabilities.
- Prefer small, reviewable changes over large rewrites.
- Preserve public APIs unless the user explicitly asks for a breaking change.
- When uncertain, inspect local files before assuming behavior.

When editing code:

- Use TypeScript strictly.
- Avoid `any` unless there is a documented reason.
- Prefer explicit types for exported functions, renderer state, asset manifests, shader inputs, and configuration.
- Do not suppress TypeScript, ESLint, or runtime validation errors without explaining why.
- Do not introduce global mutable renderer state unless it is isolated behind a lifecycle manager.
- Do not add dependencies without checking whether the project already has an equivalent package.

## Required commands

Use the package manager already used by the repository.

Expected commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run preview
```

If available, also run:

```bash
npm run test:e2e
npm run test:visual
npm run analyze
npm run validate:assets
npm run validate:shaders
```

Before declaring work complete:

- Type checking must pass.
- Linting must pass.
- Unit tests must pass.
- Production build must pass.
- WebGL-specific validation must pass where available.
- Any skipped command must be reported with the exact reason.

## Validation policy

All external or runtime data must be validated.

Validate:

- URL query parameters
- CMS/API responses
- asset manifests
- texture metadata
- model metadata
- animation configuration
- feature flags
- WebGL capability detection results
- user-controlled scene settings
- environment variables
- build-time configuration

Preferred validation approach:

- Use schema validation such as Zod, Valibot, TypeBox, or the existing project standard.
- Keep schemas near the data boundary.
- Convert unknown input into typed internal data before use.
- Fail closed for security-sensitive inputs.
- Fail gracefully for UX-sensitive rendering features.

Do not:

- Trust JSON shape without validation.
- Cast unknown values directly into application types.
- Let invalid content reach shader uniforms, buffer creation, texture upload, or DOM injection.

## WebGL capability checks

Renderer initialization must validate capabilities before creating the scene.

Required checks:

- WebGL2 availability.
- WebGL1 fallback availability, if supported.
- required extensions.
- optional extensions with graceful fallback.
- max texture size.
- max cube map texture size.
- max renderbuffer size.
- max vertex attributes.
- max varying vectors.
- max texture image units.
- supported compressed texture formats, if used.
- highp precision availability in vertex and fragment shaders.
- antialias support expectations.
- device pixel ratio limits.
- memory-sensitive mobile conditions.

If a required capability is missing:

- Show a non-WebGL fallback.
- Explain the unsupported feature in user-safe language.
- Do not crash or show a blank canvas.

## Shader validation

All shader programs must be validated.

Required shader checks:

- Vertex shader compile status.
- Fragment shader compile status.
- Program link status.
- Program validation status where appropriate.
- Shader info logs captured in development.
- Program info logs captured in development.
- Uniform locations checked before use.
- Attribute locations checked before use.
- Required defines documented.
- Precision qualifiers explicitly defined.
- Shader source generated deterministically.

Do not:

- Ignore shader compiler logs.
- Continue rendering with a failed shader program.
- Use string-concatenated shader code without clear validation.
- Introduce shader branches that depend on undefined runtime macros.
- Assume WebGL1 and WebGL2 GLSL syntax are interchangeable.

## WebGL error handling

During development:

- Check `gl.getError()` around initialization, shader compilation, framebuffer setup, texture upload, and resource allocation.
- Treat unexpected WebGL errors as defects.
- Include enough debug information to identify the failing resource or pass.

In production:

- Avoid expensive per-frame `gl.getError()` calls unless guarded behind a debug flag.
- Log structured renderer errors where project telemetry exists.
- Never spam logs every frame.

Allowed WebGL errors for a well-formed app should be limited to:

- `OUT_OF_MEMORY`
- `CONTEXT_LOST_WEBGL`

Any other WebGL error requires investigation.

## Context loss handling

The application must handle WebGL context loss.

Required behavior:

- Listen for `webglcontextlost`.
- Prevent default behavior when appropriate.
- Stop the render loop after context loss.
- Mark GPU resources as invalid.
- Show a recoverable UI state if possible.
- Listen for `webglcontextrestored`.
- Recreate shaders, buffers, textures, framebuffers, VAOs, and render targets.
- Reload GPU-side resources from CPU-side source data.
- Resume rendering only after successful reinitialization.

Do not:

- Assume context loss only happens during rendering.
- Assume GPU resources survive context restoration.
- Continue using stale WebGL object handles.
- Hide context loss behind a generic error.

## Resource lifecycle

Every GPU resource must have clear ownership and disposal.

Resources requiring explicit lifecycle management:

- buffers
- vertex arrays
- textures
- framebuffers
- renderbuffers
- shader objects
- programs
- transform feedback objects
- query objects
- Three.js geometries
- Three.js materials
- Three.js textures
- Three.js render targets
- event listeners
- animation frame handles
- workers
- audio/video sources used as textures

Required cleanup:

- Cancel `requestAnimationFrame`.
- Remove event listeners.
- Dispose renderer abstractions.
- Delete raw WebGL resources.
- Release large CPU-side asset caches when no longer needed.
- Clean up on route changes, component unmount, and hot-module replacement.

Do not create a new WebGL context per component unless explicitly required.

## Render loop rules

The render loop must be deterministic and bounded.

Required:

- Use `requestAnimationFrame`.
- Clamp large delta times.
- Separate update, simulation, and render phases.
- Avoid allocations inside the hot path.
- Avoid creating vectors, matrices, materials, textures, geometries, or arrays per frame.
- Avoid synchronous layout reads in the render loop.
- Avoid blocking GPU readbacks in production.
- Pause or reduce work when the tab is hidden.
- Respect `prefers-reduced-motion`.

Performance-sensitive code must avoid:

- repeated shader compilation
- repeated texture uploads
- repeated framebuffer reconfiguration
- unnecessary state changes
- excessive draw calls
- per-frame DOM mutations
- per-frame object traversal where cached alternatives exist

## Performance budgets

Default budgets unless the project defines stricter ones:

Desktop:

- Initial JS payload: below project budget
- Stable frame time target: 16.7 ms for 60 FPS
- Avoid sustained frame time above 33 ms
- No obvious shader compilation stutter after first interaction

Mobile:

- Cap device pixel ratio if necessary.
- Prefer adaptive resolution.
- Prefer compressed textures where supported.
- Reduce post-processing.
- Avoid excessive transparent overdraw.
- Avoid loading desktop-quality assets by default.

Rendering:

- Batch draw calls where practical.
- Use instancing for repeated geometry when supported.
- Reuse materials and programs.
- Precompute static geometry.
- Avoid unnecessary framebuffer invalidation.
- Prefer smaller render targets for post-processing.
- Track texture memory and large render target allocations.

## Asset validation

All render assets must be validated before use.

Validate:

- file existence
- file extension
- MIME type where available
- dimensions
- power-of-two requirements where relevant
- maximum texture size
- color space assumptions
- alpha usage
- mipmap requirements
- compression format support
- model scale
- model vertex count
- animation clip names
- HDR/LDR expectations
- fallback asset availability

Do not:

- Upload unvalidated images directly to GPU.
- Assume textures loaded successfully.
- Assume remote assets have stable shape or dimensions.
- Block the main thread with large parsing work if a worker is viable.

## Security rules

Security-sensitive behavior:

- Do not use `eval`, `new Function`, or unsafe dynamic code generation.
- Do not inject unsanitized HTML.
- Do not load third-party scripts without explicit approval.
- Prefer local assets over CDN assets.
- If CDN use is required, document integrity and trust assumptions.
- Validate all remote asset URLs.
- Restrict asset loading to approved origins.
- Do not expose secrets in client-side code.
- Do not commit `.env` files containing secrets.
- Keep Content Security Policy compatible with the rendering implementation.

Shader and asset content must not become an injection path.

## Accessibility and fallback

The WebGL canvas must not be the only accessible content.

Required:

- Provide fallback content when WebGL is unavailable.
- Provide meaningful loading, error, and reduced-motion states.
- Respect keyboard navigation where interaction exists.
- Avoid trapping focus inside canvas interactions.
- Provide labels or surrounding semantic HTML for canvas-driven experiences.
- Do not rely on color alone.
- Ensure sufficient contrast for UI overlays.
- Provide non-animated alternatives for critical content.
- Respect `prefers-reduced-motion`.

## Browser and device support

Validate against:

- Latest stable Chrome
- Latest stable Firefox
- Latest stable Safari
- iOS Safari if mobile support is required
- Android Chrome if mobile support is required

Do not assume:

- WebGL2 is available everywhere.
- floating point render targets are available.
- linear filtering for float textures is available.
- compressed texture formats are universal.
- high-DPI rendering is affordable.
- context restoration behaves identically across browsers.

## Testing requirements

Unit tests:

- math utilities
- matrix transforms
- camera calculations
- asset manifest parsing
- config validation
- capability fallback decisions
- renderer state transitions

Integration tests:

- renderer initialization
- fallback when WebGL is unavailable
- failed shader compilation path
- failed asset loading path
- context loss and restoration
- route/component cleanup

E2E tests:

- page loads without blank canvas
- loading state appears
- error state appears for forced unsupported capabilities
- primary interactions work
- no fatal console errors
- no unhandled promise rejections

Visual tests where practical:

- baseline scene render
- resized canvas
- mobile viewport
- reduced-motion mode
- fallback mode

## Error reporting

Renderer errors must be structured.

Include:

- error category
- failing resource
- browser capability snapshot
- WebGL version
- relevant extension availability
- asset URL or logical asset ID
- shader program name
- recoverability flag

Do not expose internal stack traces to end users in production UI.

## File organization

Recommended structure:

```text
src/
  app/
  components/
  rendering/
    core/
    shaders/
    materials/
    geometry/
    textures/
    passes/
    lifecycle/
    capabilities/
    validation/
  assets/
  config/
  tests/
```

Rules:

- Keep WebGL calls isolated under `src/rendering`.
- Keep validation schemas near data boundaries.
- Keep shader source in dedicated files or clearly named modules.
- Keep renderer lifecycle code separate from UI components.
- Keep feature detection separate from rendering implementation.
- Keep fallback UI outside the renderer.

## Documentation expectations

For every new rendering feature, document:

- purpose
- required capabilities
- fallback behavior
- performance impact
- cleanup requirements
- test coverage
- known browser limitations

For every new shader, document:

- uniforms
- attributes
- varyings
- required extensions
- precision assumptions
- expected coordinate space
- color space assumptions

## Completion checklist

A task is not complete until:

- TypeScript passes.
- Linting passes.
- Unit tests pass.
- Production build passes.
- WebGL initialization has validated required capabilities.
- Shader compile/link errors are handled.
- Asset loading errors are handled.
- Context loss behavior is not broken.
- Resource cleanup is accounted for.
- Fallback UI exists for unsupported WebGL.
- Accessibility impact has been considered.
- Performance-sensitive changes avoid per-frame allocations.
- The final response lists commands run and any commands not run.

## Do not do these things

Do not:

- Ship a blank canvas as an error state.
- Ignore shader compiler output.
- Ignore failed texture uploads.
- Ignore context loss.
- Allocate large objects in the render loop.
- Add global renderer state without lifecycle ownership.
- Add dependencies without justification.
- Suppress validation failures.
- Use unsupported extensions without fallback.
- Assume all users have discrete GPUs.
- Assume mobile Safari behaves like desktop Chrome.
- Claim validation passed if commands were not run.