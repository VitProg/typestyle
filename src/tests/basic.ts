import {style, stylesheet, getStyles, reinit, classes, cssRule, createTypeStyle} from '../index';
import * as assert from 'assert';

describe("initial test", () => {
  it("should pass", () => {
    reinit();
    assert(getStyles() === '');

    style({ color: 'red' });
    assert.equal(getStyles(), '.f1jvcvsh{color:red}');
  });

  it("reinit should clear", () => {
    reinit();
    assert(getStyles() === '');

    style({ color: 'red' });
    assert.equal(getStyles(), '.f1jvcvsh{color:red}');
  });

  it("child same", () => {
    reinit();
    style({ color: 'red', $nest: { '&>*': { color: 'red' } } });
    assert.equal(getStyles(), '.f1nv0def,.f1nv0def>*{color:red}');
  });

  it("child same unique", () => {
    reinit();
    style({ color: 'red', $nest: { '&>*': { color: 'red', $unique: true } } });
    assert.equal(getStyles(), '.f1nv0def{color:red}.f1nv0def>*{color:red}');
  });

  it("child different", () => {
    reinit();
    style({ color: 'red', $nest: { '&>*': { color: 'blue' } } });
    assert.equal(getStyles(), '.fv84gyi{color:red}.fv84gyi>*{color:blue}');
  });

  it("media same", () => {
    reinit();
    style({
      color: 'red',
      $nest: {
        '@media (min-width: 400px)': { color: 'red' }
      }
    });
    assert.equal(getStyles(), '.f12z113b{color:red}@media (min-width: 400px){.f12z113b{color:red}}');
  });

  it("media different", () => {
    reinit();
    style({ color: 'red', $nest: { '@media (min-width: 400px)': { color: 'blue' } } });
    assert.equal(getStyles(), '.fxfrsga{color:red}@media (min-width: 400px){.fxfrsga{color:blue}}');
  });

  it("classes should compose", () => {
    assert.equal(classes("a", "b"), "a b");
    assert.equal(classes("a", false && "b"), "a");
    assert.equal(classes("a", false && "b", "c"), "a c");
    assert.equal(classes("a", false && "b", "c", { d: false, e: true }, { f: {}, g: null }), "a c e f");
  });

  it("transparent string should render transparent in color property", () => {
    reinit();
    cssRule('.transparent', { color: 'transparent' });
    style({ color: 'transparent' });
    assert.equal(getStyles(), '.transparent,.fwarpl0{color:transparent}');
  });

  it("should support dedupe by default", () => {
    reinit();
    style({
      color: 'blue',
      $nest: {
        '&::-webkit-input-placeholder': {
          color: `rgba(0, 0, 0, 0)`,
        },
        '&::-moz-placeholder': {
          color: `rgba(0, 0, 0, 0)`,
        },
        '&::-ms-input-placeholder': {
          color: `rgba(0, 0, 0, 0)`,
        }
      }
    });
    assert.equal(getStyles(), '.f13byakl{color:blue}.f13byakl::-webkit-input-placeholder,.f13byakl::-moz-placeholder,.f13byakl::-ms-input-placeholder{color:rgba(0, 0, 0, 0)}');
  });

  it("should support $unique", () => {
    reinit();
    style({
      color: 'blue',
      $nest: {
        '&::-webkit-input-placeholder': {
          $unique: true,
          color: `rgba(0, 0, 0, 0)`,
        },
        '&::-moz-placeholder': {
          $unique: true,
          color: `rgba(0, 0, 0, 0)`,
        },
        '&::-ms-input-placeholder': {
          $unique: true,
          color: `rgba(0, 0, 0, 0)`,
        }
      }
    });
    assert.equal(getStyles(), '.f13byakl{color:blue}.f13byakl::-webkit-input-placeholder{color:rgba(0, 0, 0, 0)}.f13byakl::-moz-placeholder{color:rgba(0, 0, 0, 0)}.f13byakl::-ms-input-placeholder{color:rgba(0, 0, 0, 0)}');
  });

  it("should support $debugName", () => {
    reinit();
    style({
      $debugName: 'sample',
      color: 'blue',
      $nest: {
        '&:hover': {
          color: 'rgba(0, 0, 0, 0)',
        }
      }
    });
    assert.equal(getStyles(), '.sample_fy3xmhm{color:blue}.sample_fy3xmhm:hover{color:rgba(0, 0, 0, 0)}');
  });

  it("should omit $debugName in production", () => {
    const NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    reinit();
    style({
      $debugName: 'sample',
      color: 'blue',
      $nest: {
        '&:hover': {
          color: 'rgba(0, 0, 0, 0)',
        }
      }
    });
    process.env.NODE_ENV = NODE_ENV;
    assert.equal(getStyles(), '.fy3xmhm{color:blue}.fy3xmhm:hover{color:rgba(0, 0, 0, 0)}');
  });

  it("should generate meaningful classnames using stylesheet", () => {
    reinit();
    const classes = stylesheet({
      warning: {
        color: 'red'
      },
      success: {
        color: 'green'
      }
    });
    assert.deepEqual(classes, {
      warning: 'warning_f1jvcvsh',
      success: 'success_fmubem1'
    });
    assert.equal(getStyles(), '.warning_f1jvcvsh{color:red}.success_fmubem1{color:green}');
  });

  it("style should ignore 'false' 'null' and 'undefined'", () => {
    reinit();
    style(
      { color: 'blue' },
      false && { color: 'red' },
      null,
      undefined,
      { backgroundColor: 'red' }
    );
    assert.equal(getStyles(), '.fb25ljk{background-color:red;color:blue}');
  });

  it('should array in transform css property with nest', () => {
    reinit();
    style(
      {
        transform: ['translateX(1px)', 'translateY(2px)'],
      },
      {
        $nest: {
          '&::after': {
            transform: ['scale(1.1)', 'skew(10deg, 10deg)'],
          },
          '& .b': {
            transform: ['scale(2)', 'rotateY(90deg)'],
            $nest: {
              '&::after': {
                transform: ['scale(1.1)', 'skew(10deg, 10deg)'],
              },
            },
          },
        },
      },
    );

    assert.equal(getStyles(), '.f1842oiw{transform:translateX(1px)translateY(2px)}.f1842oiw::after,.f1842oiw .b::after{transform:scale(1.1)skew(10deg,10deg)}.f1842oiw .b{transform:scale(2)rotateY(90deg)}');
  });

  it("style should not append px to numeric properties", () => {
    reinit();
    style({
      strokeWidth: 4,
      strokeMiterlimit: 10,
    });
    assert.equal(getStyles(), '.f1xs2ny7{stroke-miterlimit:10;stroke-width:4}');
  });

  it("should generate unique instances when typestyle() is called", () => {
    const ts1 = createTypeStyle({ textContent: '' });
    const ts2 = createTypeStyle({ textContent: '' });

    ts1.style({ fontSize: 14 });
    ts2.style({ fontSize: 16 });

    assert.equal(ts1.getStyles(), '.fc4zu15{font-size:14px}');
    assert.equal(ts2.getStyles(), '.f1rwc7t7{font-size:16px}');
  });

  it("should work if no target is set on an instance", () => {
    const ts = createTypeStyle();
    ts.cssRule('body', { fontSize: 12 });

    assert.equal(ts.getStyles(), 'body{font-size:12px}');
  });

  it("should create TypeStyle instance with debugName = true and false or from process.env.NODE_ENV", () => {
    const css = {$debugName: 'test', fontSize: 14};

    const ts1 = createTypeStyle(undefined, false, true);
    const cl1 = ts1.style(css);

    const ts2 = createTypeStyle(undefined, false, false);
    const cl2 = ts2.style(css);

    assert.equal(cl1, 'test_fc4zu15');
    assert.equal(cl2, 'fc4zu15');

    ts1.reinit(true);
    assert.equal(ts1.style(css), 'test_fc4zu15');

    ts1.reinit(false);
    assert.equal(ts1.style(css), 'fc4zu15');

    ts1.reinit();
    assert.equal(ts1.style(css), 'test_fc4zu15');

    const NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    ts1.reinit();
    assert.equal(ts1.style(css), 'fc4zu15');
    process.env.NODE_ENV = NODE_ENV;

    ts1.reinit();
    assert.equal(ts1.style(css), 'test_fc4zu15');
  });
});
