export default {
  scripts: {
    start: {
        desc: "Run",
        cmd: "deno run index.js",
    }, // start

    test: {
      desc: "Run test",
      cmd: "deno test ./tests/test.js",
      watch: "true",
    }, // test

    bench: {
        desc: "Run benchmarks",
        cmd: "deno bench --unstable ./benchmarks/bench.js",
        watch: true,
    } // bench

  }, // scripts
}