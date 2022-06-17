import React, { useEffect, useState, ChangeEvent } from "react";
import { Grid, Box, Typography, TextField, Button, FormControl, InputLabel, Select } from "@mui/material";
import { cadastroUsuario } from "../../services/Service";
import RegistraUsuarioDTO from "../../models/Usuario"
import { Link, useNavigate } from "react-router-dom";
import './CadastroUsuario.css';


function CadastroUsuario() {

    let navigate = useNavigate();

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const [registraUsuarioDTO, setRegistraUsuarioDTO] = useState<RegistraUsuarioDTO>(
        {
            id: 0,
            nome: "",
            email: "",
            senha: "",
            foto: "",
            tipo: ""
        }
    );

    const [registraUsuarioDTOResultado, setRegistraUsuarioDTOResultado] = useState<RegistraUsuarioDTO>(
        {
            id: 1,
            nome: "",
            email: "",
            senha: "",
            foto: "",
            tipo: ""
        }
    );

    useEffect(() => {

        if (registraUsuarioDTOResultado.id === 0) {
            navigate('/login');
        }

    }, [registraUsuarioDTOResultado, navigate]);

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setRegistraUsuarioDTO({
            ...registraUsuarioDTO,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        if (confirmarSenha === registraUsuarioDTO.senha) {
            try {
                await cadastroUsuario(`/api/Usuarios`, registraUsuarioDTO, setRegistraUsuarioDTOResultado)
                alert('Usuario cadastrado com sucesso')
            } catch (error) {
                alert('Usuario já cadastrado, tente outro email!')
            }

        } else {
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField
                            value={registraUsuarioDTO.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField
                            value={registraUsuarioDTO.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='email' label='email' variant='outlined' name='email' margin='normal' type='email' fullWidth />

                        <TextField
                            value={registraUsuarioDTO.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />

                        <TextField
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                            id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />

                        <TextField
                            value={registraUsuarioDTO.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='foto' label='foto' variant='outlined' name='foto' margin='normal' fullWidth />

                        <FormControl
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">tipo</InputLabel>
                            <Select
                                value={registraUsuarioDTO.tipo}
                                native
                                label="tipo"
                                inputProps={{
                                    name: 'tipo',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value="NORMAL">NORMAL</option>
                                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            </Select>
                        </FormControl>
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary' className='btnCancelar'>
                                Cadastrar
                            </Button>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary'>
                                    cancelar
                                </Button>
                            </Link>

                        </Box>
                    </form>
                </Box>
            </Grid>

        </Grid>
    );
}

export default CadastroUsuario;