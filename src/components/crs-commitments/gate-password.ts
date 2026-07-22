// Single source of truth for the 2020 CRS Commitments area's password gate
// (cbf-password-gate), so all 4 pages check the same value and it only needs
// updating in one place. See cbf-password-gate.astro for the security note —
// this is a casual client-side deterrent, not real access control.
export const CRS_GATE_PASSWORD = '2020crs';
