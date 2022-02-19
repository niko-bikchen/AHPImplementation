import React from "react";
import uniqid from "uniqid";

import { calculateConsistency } from "../../../utils";

import { green, red } from "@mui/material/colors";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const numToText = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  [1 / 2]: "1/2",
  [1 / 3]: "1/3",
  [1 / 4]: "1/4",
  [1 / 5]: "1/5",
  [1 / 6]: "1/6",
  [1 / 7]: "1/7",
  [1 / 8]: "1/8",
  [1 / 9]: "1/9",
};

const MatrixInput = ({ matrix, labels, onChange }) => {
  const { consistencyNumber } = calculateConsistency(matrix);

  return (
    <Box>
      <Stack spacing={2}>
        <Stack direction="row" textAlign="center" justifyContent="center">
          <Typography fontWeight="bold" textAlign="center">
            Consistency:
          </Typography>
          &nbsp;
          <Typography
            fontWeight="bold"
            sx={{
              color:
                consistencyNumber === -1
                  ? red[600]
                  : consistencyNumber < 20
                  ? green[600]
                  : red[600],
            }}
          >
            {consistencyNumber === -1
              ? "Please, fill in the matrix."
              : `${consistencyNumber}%`}
          </Typography>
        </Stack>
        {matrix.map((_, rowNum) => (
          <Stack
            key={rowNum}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            {matrix[rowNum].map((_, colNum) => (
              <Tooltip
                title={`${labels[rowNum]} vs ${labels[colNum]}`}
                arrow
                placement="right-start"
                key={uniqid()}
              >
                {colNum <= rowNum ? (
                  <Paper
                    sx={{ width: "80px", padding: "15px 0" }}
                    variant="outlined"
                    elevation={0}
                  >
                    <Typography textAlign="center">
                      {matrix[rowNum][colNum] === 0
                        ? "?"
                        : numToText[matrix[rowNum][colNum]]}
                    </Typography>
                  </Paper>
                ) : (
                  <Select
                    label="Value"
                    key={uniqid()}
                    value={matrix[rowNum][colNum]}
                    onChange={onChange(rowNum, colNum)}
                    sx={{ width: "80px" }}
                  >
                    <MenuItem value={0}>?</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    {Array.from({ length: 9 }).map(
                      (_, number) =>
                        number + 1 !== 1 && (
                          <MenuItem value={number + 1} key={uniqid()}>
                            {number + 1}
                          </MenuItem>
                        )
                    )}
                    {Array.from({ length: 9 }).map(
                      (_, number) =>
                        number + 1 !== 1 && (
                          <MenuItem value={1 / (number + 1)} key={uniqid()}>
                            1 / {number + 1}
                          </MenuItem>
                        )
                    )}
                  </Select>
                )}
              </Tooltip>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
export default MatrixInput;
