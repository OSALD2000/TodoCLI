import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../dist/todo-cli.js", import.meta.url));

const run = (cwd, ...args) => spawnSync(process.execPath, [cli, ...args], { cwd, encoding: "utf8" });
const read = (cwd) => JSON.parse(readFileSync(path.join(cwd, ".todo/todo.json"), "utf8"));

test("todo list lifecycle", (t) => {
    const dir = mkdtempSync(path.join(tmpdir(), "todo-cli-"));
    t.after(() => rmSync(dir, { recursive: true, force: true }));

    assert.equal(run(dir, "--show").status, 1, "show without list fails");
    assert.equal(run(dir, "--create").status, 0);
    assert.equal(run(dir, "--create").status, 1, "second create fails");

    run(dir, "--add", "buy", "milk");
    run(dir, "--add", "write tests");
    assert.deepEqual(read(dir).todos.map(t => t.text), ["buy milk", "write tests"]);

    assert.equal(run(dir, "--done", "5").status, 1, "out-of-range done fails without crash");
    assert.equal(run(dir, "--delete", "-1").status, 1, "negative index is rejected");
    assert.equal(read(dir).todos.length, 2);

    assert.equal(run(dir, "--done", "0").status, 0);
    assert.deepEqual(read(dir).todos_done.map(t => t.text), ["buy milk"]);

    assert.equal(run(dir, "--hide", "0").status, 0);
    assert.equal(read(dir).todos_done[0].hidden, true, "hide keeps the todo");
    assert.doesNotMatch(run(dir, "--show", "-d").stdout, /buy milk/);
    assert.match(run(dir, "--show", "-hidden").stdout, /buy milk/);

    assert.equal(run(dir, "--delete", "-d", "0").status, 0);
    assert.equal(read(dir).todos_done.length, 0);

    assert.equal(run(dir, "--reset").status, 0);
    assert.equal(existsSync(path.join(dir, ".todo")), false);
});

test("gitignore handling", (t) => {
    const dir = mkdtempSync(path.join(tmpdir(), "todo-cli-"));
    t.after(() => rmSync(dir, { recursive: true, force: true }));
    mkdirSync(path.join(dir, ".git"));
    const gitignore = () => readFileSync(path.join(dir, ".gitignore"), "utf8");

    run(dir, "--create", "-ig");
    assert.equal(gitignore(), ".todo\n");
    run(dir, "--ignore", "-n");
    assert.doesNotMatch(gitignore(), /\.todo/);
    run(dir, "--ignore");
    assert.match(gitignore(), /\.todo/);
    run(dir, "--reset");
    assert.doesNotMatch(gitignore(), /\.todo/);
});

test("no arguments shows help", () => {
    const result = run(tmpdir());
    assert.equal(result.status, 0);
    assert.match(result.stdout, /Usage: todo-cli/);
});
