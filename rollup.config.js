import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dotenv from 'rollup-plugin-dotenv';

const extensions = ['.ts', '.js'];

function preventThreeShakingPlugin() {
  return {
    name: 'no-threeshaking',
    resolveId(id, importer) {
      // let's not theeshake entry points, as we're not exporting anything in App Scripts
      if (!importer) {
        return { id, moduleSideEffects: 'no-treeshake' };
      }
    },
  };
}

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'es',
    },
  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.build.json' }),
    preventThreeShakingPlugin(),
    nodeResolve({
      extensions,
      mainFields: ['jsnext:main', 'main'],
    }),
    babel({
      extensions,
      babelHelpers: 'runtime',
      comments: false,
    }),
    dotenv(),
  ],
};
