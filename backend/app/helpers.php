<?php

use Carbon\Carbon;
use Coduo\PHPHumanizer\DateTimeHumanizer;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

function slugify($text)
{
    $text = tirarAcentos($text);
    // replace non letter or digits by -
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);

    // transliterate
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

    // remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);

    // trim
    $text = trim($text, '-');

    // remove duplicate -
    $text = preg_replace('~-+~', '-', $text);

    // lowercase
    $text = strtolower($text);

    if (empty($text)) {
        return 'n-a';
    }

    return $text;
}

function gerarHash($tamanho = 8)
{
    return Str::limit(bin2hex(random_bytes(4)), $tamanho, '');
}

function getCarbon(Carbon|string $data): Carbon
{
    if ($data instanceof Carbon) return $data;
    else return Carbon::parse($data);
}

function listaLogradourosSubstituicao()
{
    $inicio['ACESSO'] = 'ACS';
    $inicio['ADRO'] = 'AD';
    $inicio['AEROPORTO'] = 'AER';
    $inicio['ALAMEDA'] = 'AL';
    $inicio['ALTO'] = 'AT';
    $inicio['ATALHO'] = 'ATL';
    $inicio['ATERRO'] = 'ATER';
    $inicio['AUTODROMO'] = 'ATD';
    $inicio['AVENIDA'] = 'AV';
    $inicio['BAIA'] = 'BAIA';
    $inicio['BAIRRO'] = 'B';
    $inicio['BAIXA'] = 'BX';
    $inicio['BALNEARIO'] = 'BAL';
    $inicio['BECO'] = 'BC';
    $inicio['BELVEDERE'] = 'BLV';
    $inicio['BLOCO'] = 'BL';
    $inicio['BOSQUE'] = 'BQ';
    $inicio['BOULEVARD'] = 'BV';
    $inicio['CAIS'] = 'C';
    $inicio['CAMINHO'] = 'CAM';
    $inicio['CAMPO'] = 'CPO';
    $inicio['CANAL'] = 'CAN';
    $inicio['CARTODROMO'] = 'CTD';
    $inicio['CHACARA'] = 'CH';
    $inicio['CHAPADAO'] = 'CHP';
    $inicio['CIDADE'] = 'CD';
    $inicio['COLONIA'] = 'COL';
    $inicio['CONDOMINIO'] = 'COND';
    $inicio['CONJUNTO'] = 'CJ';
    $inicio['CORREDOR'] = 'COR';
    $inicio['CORREGO'] = 'CRG';
    $inicio['DESCIDA'] = 'DSC';
    $inicio['DESVIO'] = 'DSV';
    $inicio['DISTRITO'] = 'DT';
    $inicio['EDIFICIO'] = 'ED';
    $inicio['ENTREPOSTO'] = 'ETP';
    $inicio['ENTRONCAMENTO'] = 'ENT';
    $inicio['ESCADARIA'] = 'ESD';
    $inicio['ESCADINHA'] = 'ESC';
    $inicio['ESPLANADA'] = 'ESP';
    $inicio['ESTACAO'] = 'ETC';
    $inicio['ESTADIO'] = 'ETD';
    $inicio['ESTANCIA'] = 'ETN';
    $inicio['ESTRADA'] = 'EST';
    $inicio['FAVELA'] = 'FAV';
    $inicio['FAZENDA'] = 'FAZ';
    $inicio['FEIRA'] = 'FRA';
    $inicio['FERROVIA'] = 'FER';
    $inicio['FONTE'] = 'FNT';
    $inicio['FORTE'] = 'FTE';
    $inicio['FREGUESIA'] = 'FRG';
    $inicio['GALERIA'] = 'GLR';
    $inicio['GRANJA'] = 'GR';
    $inicio['HIPODROMO'] = 'HPD';
    $inicio['ILHA'] = 'IA';
    $inicio['JARDIM'] = 'JD';
    $inicio['LADEIRA'] = 'LAD';
    $inicio['LAGO'] = 'LAG';
    $inicio['LAGOA'] = 'LGA';
    $inicio['LARGO'] = 'LGO';
    $inicio['LIMITE'] = 'LIM';
    $inicio['LOTEAMENTO'] = 'LOT';
    $inicio['MANGUE'] = 'MANG';
    $inicio['MARGEM'] = 'MGM';
    $inicio['MONTE'] = 'MT';
    $inicio['MORRO'] = 'MRO';
    $inicio['PARADA'] = 'PDA';
    $inicio['PARQUE'] = 'PQ';
    $inicio['PASSAGEM'] = 'PAS';
    $inicio['PASSEIO'] = 'PSO';
    $inicio['PATIO'] = 'PTO';
    $inicio['PLANALTO'] = 'PL';
    $inicio['PLATAFORMA'] = 'PLT';
    $inicio['PONTE'] = 'PTE';
    $inicio['PORTO'] = 'PRT';
    $inicio['POSTO'] = 'POS';
    $inicio['PRACA'] = 'PCA';
    $inicio['PRAIA'] = 'PR';
    $inicio['PROLONGAMENTO'] = 'PRL';
    $inicio['RAMPA'] = 'RMP';
    $inicio['REDE'] = 'ELETRICA	REDE';
    $inicio['RETA'] = 'RTA';
    $inicio['RIO'] = 'RIO';
    $inicio['RODOVIA'] = 'RDV';
    $inicio['RUA'] = 'R';
    $inicio['RUELA'] = 'RE';
    $inicio['SERRA'] = 'SERRA';
    $inicio['SERTAO'] = 'SER';
    $inicio['SERVIDAO'] = 'SVD';
    $inicio['SETOR'] = 'ST';
    $inicio['SITIO'] = 'SIT';
    $inicio['SUBIDA'] = 'SUB';
    $inicio['SUPERQUADRA'] = 'SQD';
    $inicio['TERMINAL'] = 'TRM';
    $inicio['TERRENO'] = 'TER';
    $inicio['TRANSVERSAL'] = 'TSV';
    $inicio['TRAVESSA'] = 'TR';
    $inicio['TREVIO'] = 'TRV';
    $inicio['VALE'] = 'VAL';
    $inicio['VARGEM'] = 'VRG';
    $inicio['VARIANTE'] = 'VTE';
    $inicio['VELODROMO'] = 'VLD';

    return $inicio;
}

function diaSemanaAbreviado($diaSemana)
{
    switch ($diaSemana) {
        case 0:
            return "DOM";
        case 1:
            return "SEG";
        case 2:
            return "TER";
        case 3:
            return "QUA";
        case 4:
            return "QUI";
        case 5:
            return "SEX";
        case 6:
            return "SAB";
    }
}

function logradouroAbreviado($logradouro)
{
    $substituirInicial = listaLogradourosSubstituicao();

    foreach ($substituirInicial as $needle => $replace) {
        $pos = strpos($logradouro, $needle);
        if ($pos !== false) {
            $logradouro = substr_replace($logradouro, $replace, $pos, strlen($needle));
            break;
        }
    }

    $substituir['RESIDENCIAL'] = "RES";
    $substituir['EDIFÍCIO'] = "ED";
    $substituir['DOUTOR'] = "DR";
    $substituir['PADRA'] = "PE";
    $substituir['PROFESSOR'] = "PROF";
    $substituir['ENGENHEIRO'] = "ENG";
    $substituir['JÚNIOR'] = "JR";
    $substituir['PROFESSORA'] = "PROFA";

    $logradouro = str_replace(array_keys($substituir), array_values($substituir), $logradouro);

    return $logradouro;
}

function ocultarPartesString(string $string, int $qtdCaracteresVisiveis, $tipo = 'inicio'): string
{
    if ($tipo == 'inicio')
        return strrev(preg_replace('/\d/', '*', strrev($string), strlen($string) - $qtdCaracteresVisiveis));
    else
        return preg_replace('/\d/', '*', $string, strlen($string) - $qtdCaracteresVisiveis);
}

function findMax($row)
{
    return count($row);
}

function extraiDatasPeriodo($periodo)
{
    $datas = explode(' - ', $periodo);

    return [
        \Carbon\Carbon::createFromFormat('d/m/Y', $datas[0])->startOfDay(),
        \Carbon\Carbon::createFromFormat('d/m/Y', $datas[1])->endOfDay()
    ];
}

function extenso($valor = 0, $apenasNumero = false)
{

    $singular = ["centavo", "real", "mil", "milhão", "bilhão", "trilhão", "quatrilhão"];
    $plural = ["centavos", "reais", "mil", "milhões", "bilhões", "trilhões", "quatrilhões"];
    $u = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];


    $c = ["", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
    $d = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    $d10 = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezesete", "dezoito", "dezenove"];

    $z = 0;
    $rt = "";

    $valor = number_format($valor, 2, ".", ".");
    $inteiro = explode(".", $valor);

    for ($i = 0; $i < count($inteiro); $i++)
        for ($ii = strlen($inteiro[$i]); $ii < 3; $ii++)
            $inteiro[$i] = "0" . $inteiro[$i];

    $fim = count($inteiro) - ($inteiro[count($inteiro) - 1] > 0 ? 1 : 2);
    for ($i = 0; $i < count($inteiro); $i++) {
        $valor = $inteiro[$i];
        $rc = (($valor > 100) && ($valor < 200)) ? "cento" : $c[$valor[0]];
        $rd = ($valor[1] < 2) ? "" : $d[$valor[1]];
        $ru = ($valor > 0) ? (($valor[1] == 1) ? $d10[$valor[2]] : $u[$valor[2]]) : "";

        $r = $rc . (($rc && ($rd || $ru)) ? " e " : "") . $rd . (($rd &&
                $ru) ? " e " : "") . $ru;
        $t = count($inteiro) - 1 - $i;

        if (!$apenasNumero || ($apenasNumero && $i != $fim)) {
            $r .= $r ? " " . ($valor > 1 ? $plural[$t] : $singular[$t]) : "";
        }

        if ($valor == "000") $z++; elseif ($z > 0) $z--;
        if (($t == 1) && ($z > 0) && ($inteiro[0] > 0)) $r .= (($z > 1) ? " de " : "") . $plural[$t];
        if ($r) $rt = $rt . ((($i > 0) && ($i <= $fim) && ($inteiro[0] > 0) && ($z < 1)) ? (($i < $fim) ? ", " : " e ") : " ") . $r;
    }


    $return = $rt ? $rt : "zero";

    return trim($return);

}

function validaCPF($cpf = null)
{
    // Verifica se um número foi informado
    if (empty($cpf)) {
        return false;
    }

    // Elimina possivel mascara
//    $cpf = ereg_replace('[^0-9]', '', $cpf);
    $cpf = str_pad($cpf, 11, '0', STR_PAD_LEFT);

    // Verifica se o numero de digitos informados é igual a 11
    if (strlen($cpf) != 11) {
        return false;
    }
    // Verifica se nenhuma das sequências invalidas abaixo
    // foi digitada. Caso afirmativo, retorna falso
    else if ($cpf == '00000000000' || $cpf == '11111111111' || $cpf == '22222222222' || $cpf == '33333333333' || $cpf == '44444444444' || $cpf == '55555555555' || $cpf == '66666666666' || $cpf == '77777777777' || $cpf == '88888888888' || $cpf == '99999999999') {
        return false;
        // Calcula os digitos verificadores para verificar se o
        // CPF é válido
    } else {

        for ($t = 9; $t < 11; $t++) {

            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                return false;
            }
        }

        return $cpf;
    }
}

function obtemNomeMes($mes, $reduzido = 0)
{
    if ($reduzido == 0) {
        switch ($mes) {
            case 1:
                $mes = "Janeiro";
                break;
            case 2:
                $mes = "Fevereiro";
                break;
            case 3:
                $mes = "Março";
                break;
            case 4:
                $mes = "Abril";
                break;
            case 5:
                $mes = "Maio";
                break;
            case 6:
                $mes = "Junho";
                break;
            case 7:
                $mes = "Julho";
                break;
            case 8:
                $mes = "Agosto";
                break;
            case 9:
                $mes = "Setembro";
                break;
            case 10:
                $mes = "Outubro";
                break;
            case 11:
                $mes = "Novembro";
                break;
            case 12:
                $mes = "Dezembro";
                break;
        }
    } else {
        switch ($mes) {
            case 1:
                $mes = "Jan";
                break;
            case 2:
                $mes = "Fev";
                break;
            case 3:
                $mes = "Mar";
                break;
            case 4:
                $mes = "Abr";
                break;
            case 5:
                $mes = "Mai";
                break;
            case 6:
                $mes = "Jun";
                break;
            case 7:
                $mes = "Jul";
                break;
            case 8:
                $mes = "Ago";
                break;
            case 9:
                $mes = "Set";
                break;
            case 10:
                $mes = "Out";
                break;
            case 11:
                $mes = "Nov";
                break;
            case 12:
                $mes = "Dez";
                break;
        }
    }

    return $mes;
}

function getPrimeiroUltimoNome($nome, $iniciais = 0)
{
    $exp = explode(' ', $nome);

    if (sizeof($exp) > 1) {
        if (strlen($exp[0]) == 1 && sizeof($exp) > 2) {
            return $exp[0] . ' ' . $exp[1] . ' ' . $exp[sizeof($exp) - 1];
        }
        if ($iniciais == 0) return $exp[0] . ' ' . $exp[sizeof($exp) - 1];

        return $exp[0][0] . $exp[sizeof($exp) - 1][0];
    } else {
        if ($iniciais == 0) return $nome;
        return $nome[0] . $nome[1];
    }

}

function tirarAcentos($string)
{
    return preg_replace(array("/(á|à|ã|â|ä)/", "/(Á|À|Ã|Â|Ä)/", "/(é|è|ê|ë)/", "/(É|È|Ê|Ë)/", "/(í|ì|î|ï)/", "/(Í|Ì|Î|Ï)/", "/(ó|ò|õ|ô|ö)/", "/(Ó|Ò|Õ|Ô|Ö)/", "/(ú|ù|û|ü)/", "/(Ú|Ù|Û|Ü)/", "/(ñ)/", "/(Ñ)/", "/(ç)/", "/(Ç)/"), explode(" ", "a A e E i I o O u U n N c C"), $string);
}

function transformarDataExtenso($data, $abreviado = false)
{
    $data = DateTimeHumanizer::difference(\Carbon\Carbon::now(), \Carbon\Carbon::parse($data), 'pt-br');

    if($abreviado){
        $data = str_replace(' ', '', $data);
        $data = str_replace('minutos', 'm ', $data);
        $data = str_replace('minuto', 'm ', $data);
        $data = str_replace('segundos', 's ', $data);
        $data = str_replace('segundo', 's ', $data);
        $data = str_replace('horas', 'h ', $data);
        $data = str_replace('hora', 'h ', $data);
        $data = str_replace('dias', 'd ', $data);
        $data = str_replace('dia', 'd ', $data);
        $data = str_replace('semanas', 'sem ', $data);
        $data = str_replace('semana', 'sem ', $data);
        $data = str_replace('meses', 'M ', $data);
        $data = str_replace('mês', 'M ', $data);
        $data = str_replace('anos', 'a ', $data);
        $data = str_replace('ano', 'a ', $data);
    }

    return str_replace('atrás', '', $data);
}

function getPrimeiroNome($nome)
{
    $exp = explode(' ', $nome);
    if (sizeof($exp) > 0) {
        return $exp[0];
    }
    return "";

}

function getSobrenome($nome)
{

    $exp = explode(' ', $nome);

    if (sizeof($exp) > 1) {
        unset($exp[0]);
        return implode(" ", $exp);
    }
    return "";

}

function getUltimoSobrenome($nome)
{

    $exp = explode(' ', $nome);

    if (sizeof($exp) > 1) {
        return $exp[sizeof($exp) - 1];
    }
    return "";

}

function validaEmail($email)
{
    //verifica se e-mail esta no formato correto de escrita
    $pattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i";
    if (!preg_match($pattern, $email)) {
        $mensagem = 'E-mail Inv&aacute;lido!';
        return $mensagem;
    } else {
        //Valida o dominio
        $dominio = explode('@', $email);
        $mx = [];
        if (!getmxrr($dominio[1], $mx)) {
            return false;
        } else {
            return true;
        } // Retorno true para indicar que o e-mail é valido
    }
}

function compareVersion($a, $b)
{

    if ($a == $b) {
        return 0;
    }

    $a_components = explode('.', $a);
    $b_components = explode('.', $b);

    $len = sizeof($a_components) > sizeof($b_components) ? sizeof($b_components) : sizeof($a_components);

    // loop while the components are equal
    for ($i = 0; $i < $len; $i++) {
        // eslint-disable-next-line radix
        if ($a_components[$i] > $b_components[$i]) {
            return 1;
        }

        // eslint-disable-next-line radix
        if ($a_components[$i] < $b_components[$i]) {
            return -1;
        }
    }

    if (sizeof($a_components) > sizeof($b_components)) {
        return 1;
    }

    if (sizeof($a_components) < sizeof($b_components)) {
        return -1;
    }

    return 0;
}

//Extrai os dados do request apenas os campos que fazem parte do fillable de um model
function extrairDados($dados, $keysParaExtrair)
{
    $array = array_filter(
        $dados,
        function ($key) use ($keysParaExtrair) {
            return in_array($key, $keysParaExtrair);
        },
        ARRAY_FILTER_USE_KEY
    );

    return $array;

}

function validateJsPath($arquivoJs)
{
    if ($arquivoJs == "*")
        return false;

    return Str::contains(url()->current(), $arquivoJs);
}

function validaColletion(Collection $collection, $type)
{
    if (!$collection || $collection->count() == 0) return $collection;
    if (!$collection->first() instanceof $type) throw new \Exception("Tipo inválido no retorno da collection");
    return $collection;
}

function limitaString(string $text, int $count, bool $insertDots)
{
    if (strlen($text) < $count)
        return $text;

    return substr($text, 0, $count) . (((strlen($text) > $count) && $insertDots) ? "..." : "");
}

function tempoLeitura($texto)
{
    $content = $texto;
    $char_count = mb_strlen(strip_tags($content), "UTF-8");

    $min = ceil($char_count / 1200); // tempo médio de leitura: 1200 caracteres

    $tempo = 'Aproximadamente ';
    if ($min <= 1) {
        $tempo .= '1 min';
    } else {
        $tempo .= $min . ' min';
    }
    $tempo .= ' de leitura';
    return $tempo;
}


/**
 * INICIO METRONIC HELPERS
 **/

if (!function_exists('get_svg_icon')) {
    function get_svg_icon($path, $class = null, $svgClass = null)
    {
        if (strpos($path, 'media') === false) {
            $path = theme()->getMediaUrlPath() . $path;
        }

        $file_path = public_path($path);

        if (!file_exists($file_path)) {
            return '';
        }

        $svg_content = file_get_contents($file_path);

        if (empty($svg_content)) {
            return '';
        }

        $dom = new DOMDocument();
        $dom->loadXML($svg_content);

        // remove unwanted comments
        $xpath = new DOMXPath($dom);
        foreach ($xpath->query('//comment()') as $comment) {
            $comment->parentNode->removeChild($comment);
        }

        // add class to svg
        if (!empty($svgClass)) {
            foreach ($dom->getElementsByTagName('svg') as $element) {
                $element->setAttribute('class', $svgClass);
            }
        }

        // remove unwanted tags
        $title = $dom->getElementsByTagName('title');
        if ($title['length']) {
            $dom->documentElement->removeChild($title[0]);
        }
        $desc = $dom->getElementsByTagName('desc');
        if ($desc['length']) {
            $dom->documentElement->removeChild($desc[0]);
        }
        $defs = $dom->getElementsByTagName('defs');
        if ($defs['length']) {
            $dom->documentElement->removeChild($defs[0]);
        }

        // remove unwanted id attribute in g tag
        $g = $dom->getElementsByTagName('g');
        foreach ($g as $el) {
            $el->removeAttribute('id');
        }
        $mask = $dom->getElementsByTagName('mask');
        foreach ($mask as $el) {
            $el->removeAttribute('id');
        }
        $rect = $dom->getElementsByTagName('rect');
        foreach ($rect as $el) {
            $el->removeAttribute('id');
        }
        $xpath = $dom->getElementsByTagName('path');
        foreach ($xpath as $el) {
            $el->removeAttribute('id');
        }
        $circle = $dom->getElementsByTagName('circle');
        foreach ($circle as $el) {
            $el->removeAttribute('id');
        }
        $use = $dom->getElementsByTagName('use');
        foreach ($use as $el) {
            $el->removeAttribute('id');
        }
        $polygon = $dom->getElementsByTagName('polygon');
        foreach ($polygon as $el) {
            $el->removeAttribute('id');
        }
        $ellipse = $dom->getElementsByTagName('ellipse');
        foreach ($ellipse as $el) {
            $el->removeAttribute('id');
        }

        $string = $dom->saveXML($dom->documentElement);

        // remove empty lines
        $string = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $string);

        $cls = array('svg-icon');

        if (!empty($class)) {
            $cls = array_merge($cls, explode(' ', $class));
        }

        $asd = explode('/media/', $path);
        if (isset($asd[1])) {
            $path = 'assets/media/' . $asd[1];
        }

        $output = "<!--begin::Svg Icon | path: $path-->\n";
        $output .= '<span class="' . implode(' ', $cls) . '">' . $string . '</span>';
        $output .= "\n<!--end::Svg Icon-->";

        return $output;
    }
}

if (!function_exists('theme')) {
    /**
     * Get the instance of Theme class core
     *
     * @return \App\Core\Adapters\Theme|\Illuminate\Contracts\Foundation\Application|mixed
     */
    function theme()
    {
        return app(\App\Core\Adapters\Theme::class);
    }
}

if (!function_exists('util')) {
    /**
     * Get the instance of Util class core
     *
     * @return \App\Core\Adapters\Util|\Illuminate\Contracts\Foundation\Application|mixed
     */
    function util()
    {
        return app(\App\Core\Adapters\Util::class);
    }
}

if (!function_exists('bootstrap')) {
    /**
     * Get the instance of Util class core
     *
     * @return \App\Core\Adapters\Util|\Illuminate\Contracts\Foundation\Application|mixed
     * @throws Throwable
     */
    function bootstrap()
    {
        $demo = ucwords(theme()->getDemo());
        $bootstrap = "\App\Core\Bootstraps\Bootstrap$demo";

        if (!class_exists($bootstrap)) {
            abort(404, 'Demo has not been set or ' . $bootstrap . ' file is not found.');
        }

        return app($bootstrap);
    }
}

if (!function_exists('assetCustom')) {
    /**
     * Get the asset path of RTL if this is an RTL request
     *
     * @param $path
     * @param null $secure
     *
     * @return string
     */
    function assetCustom($path)
    {
        // Include rtl css file
        if (isRTL()) {
            return asset(theme()->getDemo() . '/' . dirname($path) . '/' . basename($path, '.css') . '.rtl.css');
        }

        // Include dark style css file
        if (theme()->isDarkModeEnabled() && theme()->getCurrentMode() !== 'default') {
            $darkPath = str_replace('.bundle', '.' . theme()->getCurrentMode() . '.bundle', $path);
            if (file_exists(public_path(theme()->getDemo() . '/' . $darkPath))) {
                return asset(theme()->getDemo() . '/' . $darkPath);
            }
        }

        // Include default css file
        return asset(theme()->getDemo() . '/' . $path);
    }
}

if (!function_exists('isRTL')) {
    /**
     * Check if the request has RTL param
     *
     * @return bool
     */
    function isRTL()
    {
        return (bool)request()->input('rtl');
    }
}

if (!function_exists('preloadCss')) {
    /**
     * Preload CSS file
     *
     * @return bool
     */
    function preloadCss($url)
    {
        return '<link rel="preload" href="' . $url . '" as="style" onload="this.onload=null;this.rel=\'stylesheet\'" type="text/css"><noscript><link rel="stylesheet" href="' . $url . '"></noscript>';
    }
}


/**
 * FIM METRONIC HELPERS
 **/
