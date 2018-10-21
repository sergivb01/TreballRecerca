<?php
$serverName = htmlspecialchars($_SERVER["HTTP_HOST"]);

// Set which extension types render as Block Page (Including "" for index.ext)
$validExtTypes = array("asp", "htm", "html", "php", "rss", "xml", "");

// Get extension of current URL
$currentUrlExt = pathinfo($_SERVER["REQUEST_URI"], PATHINFO_EXTENSION);

$proto = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on" ? "https" : "http");

// Set response header
function setHeader($type = "x") {
    header("X-Powered-By: Treball de Recerca Sergi Vos");
    if (isset($type) && $type === "js") header("Content-Type: application/javascript");
}

if ($currentUrlExt === "js") {
    // Serve Pi-hole Javascript for blocked domains requesting JS
    exit(setHeader("js").'var x = "X-Powered-By: Treball de Recerca Sergi Vos"');
} elseif (strpos($_SERVER["REQUEST_URI"], "?") !== FALSE && isset($_SERVER["HTTP_REFERER"])) {
    // Serve blank image upon receiving REQUEST_URI w/ query string & HTTP_REFERRER
    // e.g: An iframe of a blocked domain
    exit(setHeader().'<html>
        <head><script>window.close();</script></head>
        <body><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs="></body>
    </html>');
} elseif (!in_array($currentUrlExt, $validExtTypes) || substr_count($_SERVER["REQUEST_URI"], "?")) {
    // Serve SVG upon receiving non $validExtTypes URL extension or query string
    // e.g: Not an iframe of a blocked domain, such as when browsing to a file/query directly
    // QoL addition: Allow the SVG to be clicked on in order to quickly show the full Block Page
    $blockImg = '<a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="110" height="16"><defs><style>a {text-decoration: none;} circle {stroke: rgba(152,2,2,0.5); fill: none; stroke-width: 2;} rect {fill: rgba(152,2,2,0.5);} text {opacity: 0.3; font: 11px Arial;}</style></defs><circle cx="8" cy="8" r="7"/><rect x="10.3" y="-6" width="2" height="12" transform="rotate(45)"/><text x="19.3" y="12">Treball Recerca Sergi Vos</text></svg></a>';
    exit(setHeader()."<html>
        <head><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'/></head>
        <body>$blockImg</body>
    </html>");
}

setHeader();
?>
<!DOCTYPE html>
<!-- Part del Treball de Recerca de Sergi Vos Bosch (curs 2018-2019) -->
<html>
<head>
  <meta charset="UTF-8">
  <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'/>
  <meta name="robots" content="noindex,nofollow"/>
  <meta http-equiv="x-dns-prefetch-control" content="off">
  <link rel="stylesheet" href="<?=$proto ?>://pi.hole/pihole/sandstone.min.css">
<script defer src="<?=$proto ?>://pi.hole/pihole/fontawesome.min.js"></script>
  <title>Page Blocked - <?=$serverName ?></title>
</head>
<body>
	<section class="hero is-dark is-fullheight">
		<!-- Hero content: will be in the middle -->
		<div class="hero-body">
			<div class="container has-text-centered">
				<h1 class="title">
					Blocked Page
				</h1>
				<div class="subtitle">
					<h2><?=$serverName ?> is blocked!</h2>
					<a class="button" href="/" style="margin-top: 2%;">
						<span class="icon is-small">
							<i class="fas fa-home"></i>
						</span>
					</a>
				</div>
			</div>
		</div>

	</section>
</body>
<style>
	* {
		overflow: hidden !important
	}
</style>
</html>