import {reinit, keyframes, getStyles} from '../index';
import * as assert from 'assert';

describe("keyframes", () => {
  it('supports $debugName in animation name', () => {
      reinit();
      const animationName = keyframes({
        $debugName: 'fade-in',
        from: { opacity: 0 },
        to: { opacity: 1 }
      });

      assert.equal(animationName, 'fade-in_f1gwuh0p');
  });


  it('should omit $debugName in production', () => {
    const NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    reinit();
    const animationName = keyframes({
      $debugName: 'fade-in',
      from: { opacity: 0 },
      to: { opacity: 1 }
    });
    process.env.NODE_ENV = NODE_ENV;

    assert.equal(animationName, 'f1gwuh0p');
  });

  it('should array in transform css property', () => {
    reinit();
    const animationName = keyframes({
      from: { opacity: 0, transform: ['rotate(10deg)'] },
      to: { opacity: 1, transform: ['scale(2)', 'translateX(10%)'] }
    });

    assert.equal(getStyles(), '@keyframes f2fxcjq{from{opacity:0;transform:rotate(10deg)}to{opacity:1;transform:scale(2)translateX(10%)}}');

    assert.equal(animationName, 'f2fxcjq');
  });

  it('supports generated animation name', () => {
    reinit();
    const animationName = keyframes({
      from: { opacity: 0 },
      to: { opacity: 1 }
    });

    assert.equal(animationName, 'f1gwuh0p');
  });
});
