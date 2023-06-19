import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { MappedPacks } from "features/packs/packsTable/mappedPacks/MappedPacks";

export const PacksTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ background: "#EFEFEF" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Cards</TableCell>
            <TableCell align="center">Last Updated</TableCell>
            <TableCell align="center">Created by</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MappedPacks />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
