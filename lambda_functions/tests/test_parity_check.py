from tools.parity_check import same


def test_same_handles_strings_numbers_and_missing_keys():
    assert same("NaN", "NaN", 1e-6)
    assert not same("NaN", 1.0, 1e-6)
    assert same(1.0, 1.0000001, 1e-6)
    assert not same(1.0, 2.0, 1e-6)
    assert not same(None, 1.0, 1e-6)
    assert not same(1.0, None, 1e-6)
    assert same(None, None, 1e-6)
