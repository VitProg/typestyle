import { extend } from '../index';
import * as assert from 'assert';
describe("extend", function () {
    it("plain objects should be preserved", function () {
        assert.deepEqual(extend({ color: 'red' }), { color: 'red' });
    });
    it("nested objects should not get flattened", function () {
        assert.deepEqual(extend({
            $nest: { '&:hover': { color: 'red' } }
        }), {
            $nest: { '&:hover': { color: 'red' } }
        });
    });
    it("nested objects should merge into non nested", function () {
        assert.deepEqual(extend({ color: 'grey' }, { $nest: { '&:hover': { color: 'red' } } }), {
            color: 'grey',
            $nest: { '&:hover': { color: 'red' } }
        });
    });
    it("nested objects should merge together", function () {
        assert.deepEqual(extend({ color: 'grey' }, { backgroundColor: 'grey' }, { $nest: { '&:hover': { color: 'red' } } }, { $nest: { '&:hover': { backgroundColor: 'red' } } }), {
            color: 'grey',
            backgroundColor: 'grey',
            $nest: {
                '&:hover': {
                    color: 'red',
                    backgroundColor: 'red'
                }
            }
        });
    });
    it("extend should compose i.e. should be nestable", function () {
        assert.deepEqual(extend(extend({ $nest: { '&:hover': { color: 'red' } } }), { $nest: { '&:hover': { backgroundColor: 'red' } } }), {
            $nest: {
                '&:hover': {
                    color: 'red',
                    backgroundColor: 'red'
                }
            }
        });
    });
    it("extend should compose i.e. should be truly nestable", function () {
        assert.deepEqual(extend(extend({ $nest: { '&:hover': { color: 'red' } } }), extend({ $nest: { '&:hover': { backgroundColor: 'red' } } })), {
            $nest: {
                '&:hover': {
                    color: 'red',
                    backgroundColor: 'red'
                }
            }
        });
    });
    it("different nested keys should not merge", function () {
        assert.deepEqual(extend({ $nest: { '&:hover': { color: 'red' } } }, { $nest: { '&:hover': { backgroundColor: 'red' } } }, { $nest: { '&:focus': { backgroundColor: 'red' } } }, { $nest: { '&:hover': { fontSize: '14px' }, '&:focus': { fontFamily: 'arial' } } }), {
            $nest: {
                '&:hover': {
                    fontSize: '14px',
                    color: 'red',
                    backgroundColor: 'red'
                },
                '&:focus': {
                    fontFamily: 'arial',
                    backgroundColor: 'red'
                }
            }
        });
    });
});
