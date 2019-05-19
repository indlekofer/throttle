import assert from 'assert';

import throttle from '../src/index';
import sinon from 'sinon';

describe('throttle', () => {
  let fnt, clock, v;
  beforeEach(() => {
    fnt = throttle(() => ++v);
    clock = sinon.useFakeTimers();
    v = 0;
  });

  afterEach(() => {
    clock.restore();
  });

  it('basic', () => {
    assert.equal(v, 0);
    fnt();
    assert.equal(v, 0);
    clock.tick(10);
    fnt();
    assert.equal(v, 0);
    fnt();
    assert.equal(v, 0);
    clock.tick(110);
    assert.equal(v, 1);
    fnt();
    assert.equal(v, 1);
    clock.tick(110);
    fnt();
    assert.equal(v, 2);
  });
  it('basic immediate', () => {
    fnt = throttle(() => ++v, 100, true);
    assert.equal(v, 0);
    fnt();
    assert.equal(v, 1);
    clock.tick(110);
    assert.equal(v, 2);
    fnt();
    assert.equal(v, 2);
  });
  it('long test', () => {
    fnt();
    assert.equal(v, 0);
    clock.tick(100);
    assert.equal(v, 1);
    fnt();
    assert.equal(v, 1);
    clock.tick(10);
    assert.equal(v, 1);
    fnt();
    assert.equal(v, 1);
    clock.tick(10);
    assert.equal(v, 1);
    fnt();
    assert.equal(v, 1);
    clock.tick(10);
    assert.equal(v, 1);
    fnt();
    assert.equal(v, 1);
    clock.tick(110);
    fnt();
    assert.equal(v, 2);
    fnt();
    assert.equal(v, 2);
    clock.tick(10);
    fnt();
    assert.equal(v, 2);
    clock.tick(10);
    fnt();
    assert.equal(v, 2);
    clock.tick(10);
    fnt();
    assert.equal(v, 2);
    clock.tick(10);
    fnt();
    assert.equal(v, 2);
    clock.tick(110);
    fnt();
    fnt();
    assert.equal(v, 3);
  });
  it('arguments check', () => {
    let y = [],
      a = 'a111',
      b = 'b222',
      tempfn = throttle((x, p) => {
        y = [x,p];
      }, 100, true);
    
    tempfn(a, b);
    assert.equal(y[0], a);
    assert.equal(y[1], b);
  });
});
