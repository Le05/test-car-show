<?php

namespace App\Classes;

class FormataTudo
{
    public static function formatar($dados, $tipo, $destino = 'form')
    {

        if ($dados === null) return null;

        if ($dados == "" && $tipo == "data") return "0000-00-00";
        if ($dados == "" && $tipo == "telefone") return "";
        if (strlen($dados) == 11 && $tipo == "telefone") $tipo = "celular";

        if ($destino == 'form') {
            if (strlen($dados) == 12 && ($tipo == "telefone" || $tipo == "celular")) $tipo = "telefone_ddi";
            if (strlen($dados) == 13 && ($tipo == "telefone" || $tipo == "celular")) $tipo = "celular_ddi";
        }


        $tipo = strtolower($tipo);
        if ($destino == 'banco') {
            switch ($tipo) {
                case "documento":
                case "cnpj":
                case "cpf":
                case "celular":
                case "cep":
                case "inteiro":
                case "pis":
                    $dados = self::formatar($dados, 'limpanumero', 'banco');
                    break;
                case "telefone":
                    $dados = self::formatar($dados, 'limpanumero', 'banco');

                    if (strlen($dados) < 8 || $dados == "") {
                        return "";
                    } else {
                        if (strlen($dados) < 10 && strlen($dados) >= 8) $dados = "17" . $dados;


                        if ($dados[2] > 5 && strlen($dados) == 10) {
                            $dados = substr_replace($dados, '9', 2, 0);
                        }
                    }

                    break;
                case "moeda":
                    $dados = str_replace('R$', '', trim(self::formatar($dados, 'decimal', 'banco')));
                    break;
                case "decimal":
                    $dados = self::converter_decimal_vp($dados);
                    break;
                case "data":
                    $dados = self::converter_data_fb($dados);
                    break;
                case "hora":
                    $dados = self::converter_time_bf($dados);
                    break;
                case "datahora":
                    $ret = self::converter_data_fb(substr($dados, 0, 10));
                    $ret .= ' ' . self::converter_time_bf(substr($dados, 11, 8));
                    $dados = $ret;
                    break;
                case 'limpanumero':
                    $ret = preg_replace('/[^0-9]/', '', $dados);
                    $dados = $ret;
                    break;

                default:
                    break;
            }
        } else {
            switch ($tipo) {
                case "documento":
                case "cpf":
                case "cnpj":
                    if (strlen($dados) > 11) {
                        $formato = "##.###.###/####-##";
                    } else {
                        $formato = "###.###.###-##";
                    }
                    break;
                case "pis":
                    $formato = "###.#####.##-#";
                    break;
                case "telefone":
                    $formato = "(##) ####-####";
                    break;
                case "softPhone":
                case "celular":
                    $formato = "(##) #####-####";
                    break;
                case "telefone_ddi":
                    $formato = "+## (##) ####-####";
                    break;
                case "celular_ddi":
                    $formato = "+## (##) #####-####";
                    break;
                case "cep":
                    $formato = "#####-###";
                    break;
                case "moeda":
                    $dados = str_replace(',', '.', $dados);
                    $dados = 'R$ ' . self::formatar($dados, 'decimal');
                    break;
                case "decimal":
                    $dados = self::converter_decimal_pv($dados);
                    break;
                case "inteiro":
                    $dados = self::converter_int_vp($dados);
                    break;
                case "data":
                    $dados = self::converter_data_bf($dados);
                    break;
                case "hora":
                    $dados = self::converter_time_bf($dados);
                    break;
                case "datahora":
                    $ret = self::converter_data_bf(substr($dados, 0, 10));
                    $ret .= ' ' . self::converter_time_bf(substr($dados, 11, 8));
                    $dados = $ret;
                    break;
                case "decimalarquivobanco":
                    $dados = number_format($dados, '2', '', '');
                    break;
                case "dataarquivobanco":
                    $dados = date('Ymd', strtotime($dados));
                    break;
                case "percentual":
                    $dados = round($dados * 100, 0) . "%";
                    break;
                case "percentual1d":
                    $dados = round($dados * 100, 1) . "%";
                    break;
                case "percentual2d":
                    $dados = round($dados * 100, 2) . "%";
                    break;
                case 'carboninterval':
                    if ($dados->y > 0) {
                        return $dados->y . 'A ' . $dados->m . 'M';
                    } else if ($dados->m > 0) {
                        return $dados->m . 'M ' . $dados->d . 'd';
                    } else if ($dados->d > 0) {
                        return $dados->d . 'd';
                    } else if ($dados->h > 0) {
                        return $dados->h . 'h ' . $dados->i . 'm';
                    } else if ($dados->m > 0) {
                        return $dados->m . 'm ' . $dados->s . 's';
                    } else {
                        return $dados->s . 's ';
                    }
                case "duracao_segundos":
                    if (!$dados || $dados == "" || $dados == "-") return "-";
                    if ($dados < 60) {
                        return gmdate("s\s", $dados);
                    } else if ($dados < 3600) {
                        return gmdate("i\m s\s", $dados);
                    } else if ($dados < 86400) {
                        return gmdate("H\h i\m", $dados);
                    } else {
                        return gmdate("d\d H\h", $dados);
                    }
                case "duracao_minutos_hora":
                    if (!$dados || $dados == "" || $dados == "-") return "-";

                        if($dados < 0){
                            $sinal = '-';
                            $dados = -$dados;
                        }else{
                            $sinal = '';
                        }

                        $horas = floor($dados / 60);
                        if($horas < 10) $horas = '0'.$horas;

                        return $sinal.$horas . 'h '.gmdate("i\m", $dados*60);
                case "segundos_para_hora_minuto":
                    if (!$dados || $dados == "" || $dados == "-") return "-";
                        return gmdate("i\:s", $dados);
                default:
                    break;
            }

        }
        if (isset($formato)) {
            $dados = self::string_format($formato, $dados);
        }
        return $dados;
    }

    private static function converter_int_vp($strInt)
    {
        $strInt = number_format($strInt, 0, ',', '.');
        return $strInt;
        unset($strInt);
    }

    private static function converter_int_pv($strInt)
    {
        $strInt = str_replace(".", "", $strInt);
        return $strInt;
        unset($strInt);
    }

    private static function converter_decimal_pv($strDecimal)
    {
        $strDecimalFinal = number_format($strDecimal, 2, ',', '.');
        return $strDecimalFinal;
    }

    private static function converter_decimal_vp($strDecimal)
    {
        $strDecimal = str_replace(".", "", $strDecimal);
        $strDecimalFinal = str_replace(",", ".", $strDecimal);
        return $strDecimalFinal;
    }

    private static function converter_data_fb($strData)
    {
        if (substr_count($strData, '/') == 2) {
            // Recebemos a data no formato: dd/mm/aaaa
            // Convertemos a data para o formato: aaaa-mm-dd
            if (preg_match("#/#", $strData) == 1) {
                $data = array_reverse(explode('/', $strData));
                if (strlen($data[0]) == 2) {
                    $data[0] = "20" . $data[0];
                }
                $strDataFinal = implode('-', $data);
            }


            return $strDataFinal;
        } else {
            return $strData;
        }
    }

    private static function converter_data_bf($strData)
    {
        if (substr_count($strData, '-') == 2) {
            // Recebemos a data no formato: aaa-mm-dd
            // Convertemos a data para o formato: dd/mm/aaaa
            if (preg_match("#-#", $strData) == 1) {
                $strDataFinal = implode('/', array_reverse(explode('-', $strData)));
            }
            return $strDataFinal;
        } else {
            return $strData;
        }
    }

    private static function converter_time_bf($strTime)
    {
        if (substr_count($strTime, ':') == 2) {
            list($time1, $time2, $time3) = explode(":", $strTime);
            $strTimeFinal = $time1 . ':' . $time2;
            return $strTimeFinal;
        } else {
            return $strTime;
        }
    }

    private static function string_format($format, $string, $placeHolder = "#")
    {
        $numMatches = preg_match_all("/($placeHolder+)/", $format, $matches);
        foreach ($matches[0] as $match) {
            $matchLen = strlen($match);
            $format = preg_replace("/$placeHolder+/", substr($string, 0, $matchLen), $format, 1);
            $string = substr($string, $matchLen);
        }
        return $format;
    }
}

?>
