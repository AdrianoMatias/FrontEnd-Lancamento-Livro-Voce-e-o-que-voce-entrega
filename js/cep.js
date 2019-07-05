$(document).ready(function() {
    
                function limpa_formulario_cep() {
                    // Limpa valores do formulário de cep.
                    $("#vendas_logradouro").val("");
                    $("#vendas_numero").val("");
                    $("#vendas_bairro").val("");
                    $("#vendas_cidade").val("");
                    $("#vendas_uf").val("");
                }
                
                //Quando o campo cep perde o foco.
                $("#vendas_cep").blur(function() {
    
                    //Nova variável "cep" somente com dígitos.
                    var cep = $(this).val().replace(/\D/g, '');
    
                    //Verifica se campo cep possui valor informado.
                    if (cep != "") {
    
                        //Expressão regular para validar o CEP.
                        var validacep = /^[0-9]{8}$/;
    
                        //Valida o formato do CEP.
                        if(validacep.test(cep)) {
    
                            //Preenche os campos com "..." enquanto consulta webservice.
                            $("#vendas_logradouro").val("...");
                            $("#vendas_numero").val("...");
                            $("#vendas_bairro").val("...");
                            $("#vendas_cidade").val("...");
                            $("#vendas_uf").val("...");
                           
    
                            //Consulta o webservice viacep.com.br/
                            $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
    
                                if (!("erro" in dados)) {
                                    //Atualiza os campos com os valores da consulta.
                                    $("#vendas_logradouro").val(dados.logradouro);
                                    $("#vendas_numero").val(dados.numero);
                                    $("#vendas_bairro").val(dados.bairro);
                                    $("#vendas_cidade").val(dados.localidade);
                                    $("#vendas_uf").val(dados.uf);
                                    
                                } //end if.
                                else {
                                    //CEP pesquisado não foi encontrado.
                                    limpa_formulário_cep();
                                    alert("CEP não encontrado.");
                                }
                            });
                        } //end if.
                        else {
                            //cep é inválido.
                            limpa_formulário_cep();
                            alert("Formato de CEP inválido.");
                        }
                    } //end if.
                    else {
                        //cep sem valor, limpa formulário.
                        limpa_formulário_cep();
                    }
                });
            });